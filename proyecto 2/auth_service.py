from datetime import datetime, timedelta, timezone
from contextlib import asynccontextmanager
import os
import logging
import secrets
from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient

logging.basicConfig(level=logging.INFO, format="%(asctime)s [AUTH] %(message)s", datefmt="%H:%M:%S")
log = logging.getLogger("auth")

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
AUTH_INTROSPECTION_SECRET = os.getenv("AUTH_INTROSPECTION_SECRET", "demo-secret")

client: AsyncIOMotorClient = None
db = None
SESSIONS = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, db
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client["pizzeria"]
    if not await db.users.find_one({"email": "juan@correo.cl"}):
        await db.users.insert_one({
            "nombre": "Juan Pérez",
            "email": "juan@correo.cl",
            "password": "123",
            "roles": ["cliente"]
        })
    log.info("Conectado a MongoDB (%s) base=pizzeria coleccion=users", MONGODB_URL)
    yield
    client.close()

app = FastAPI(title="Auth Service - La Fornace", lifespan=lifespan)

class RegisterRequest(BaseModel):
    nombre: str
    email: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

class IntrospectionRequest(BaseModel):
    token: str

def _corto(token: str) -> str:
    return token[:6] + "..."

def _crear_sesion(user_id: str, email: str, roles: list) -> str:
    access_token = secrets.token_urlsafe(32)
    expiration = datetime.now(timezone.utc) + timedelta(minutes=60)
    SESSIONS[access_token] = {
        "user_id": user_id,
        "username": email,
        "roles": roles,
        "expires_at": expiration
    }
    return access_token

@app.post("/register", status_code=201)
async def register(req: RegisterRequest):
    log.info("Registro solicitado para email=%s", req.email)
    log.info("MongoDB: db.users.find_one(email=%s)", req.email)
    if await db.users.find_one({"email": req.email}):
        log.warning("Registro RECHAZADO: email=%s ya existe -> 400", req.email)
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    roles = ["cliente"]
    res = await db.users.insert_one({
        "nombre": req.nombre,
        "email": req.email,
        "password": req.password,
        "roles": roles
    })
    nuevo_id = str(res.inserted_id)
    access_token = _crear_sesion(nuevo_id, req.email, roles)
    log.info("MongoDB: usuario insertado en db.users _id=%s email=%s (auto-login token=%s)", nuevo_id, req.email, _corto(access_token))

    return {
        "id": nuevo_id,
        "nombre": req.nombre,
        "email": req.email,
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": 3600
    }

@app.post("/login")
async def login(req: LoginRequest):
    log.info("Login solicitado para usuario=%s", req.username)
    log.info("MongoDB: db.users.find_one(email=%s)", req.username)
    user = await db.users.find_one({"email": req.username})
    if not user or user["password"] != req.password:
        log.warning("Login FALLIDO usuario=%s -> 401", req.username)
        raise HTTPException(status_code=401, detail="Credenciales inválidas o cuenta no creada")

    user_id = str(user["_id"])
    roles = user.get("roles", ["cliente"])
    access_token = _crear_sesion(user_id, req.username, roles)
    log.info("Login OK usuario=%s user_id=%s roles=%s token=%s", req.username, user_id, roles, _corto(access_token))

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": 3600
    }

@app.post("/introspect")
def introspect(req: IntrospectionRequest, x_gateway_auth_secret: str = Header(default="")):
    log.info("Gateway pide validación de token=%s", _corto(req.token))
    if not secrets.compare_digest(x_gateway_auth_secret, AUTH_INTROSPECTION_SECRET):
        log.warning("Secreto del Gateway INVÁLIDO -> 403")
        raise HTTPException(status_code=403, detail="Gateway no autorizado")
    log.info("Secreto del Gateway verificado OK")

    session = SESSIONS.get(req.token)
    if not session or datetime.now(timezone.utc) > session["expires_at"]:
        log.warning("Token %s inválido o expirado -> active=false", _corto(req.token))
        return {"active": False}

    log.info("Token %s ACTIVO user_id=%s roles=%s -> active=true", _corto(req.token), session["user_id"], session["roles"])
    return {"active": True, **session}