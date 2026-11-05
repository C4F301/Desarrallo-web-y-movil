from datetime import datetime, timedelta, timezone
import os
import secrets
from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel

app = FastAPI(title="Auth Service - La Fornace")

USERS = {
    "juan@correo.cl": {
        "password": "123",
        "user_id": "USR-001",
        "roles": ["cliente"]
    }
}

SESSIONS = {}
AUTH_INTROSPECTION_SECRET = os.getenv("AUTH_INTROSPECTION_SECRET", "demo-secret")

class LoginRequest(BaseModel):
    username: str
    password: str

class IntrospectionRequest(BaseModel):
    token: str

@app.post("/login")
def login(req: LoginRequest):
    user = USERS.get(req.username)
    if not user or user["password"] != req.password:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    
    access_token = secrets.token_urlsafe(32)
    expiration = datetime.now(timezone.utc) + timedelta(minutes=60)
    
    SESSIONS[access_token] = {
        "user_id": user["user_id"],
        "username": req.username,
        "roles": user["roles"],
        "expires_at": expiration
    }
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": 3600
    }

@app.post("/introspect")
def introspect(req: IntrospectionRequest, x_gateway_auth_secret: str = Header(default="")):
    if not secrets.compare_digest(x_gateway_auth_secret, AUTH_INTROSPECTION_SECRET):
        raise HTTPException(status_code=403, detail="Gateway no autorizado")
    
    session = SESSIONS.get(req.token)
    if not session or datetime.now(timezone.utc) > session["expires_at"]:
        return {"active": False}
    
    return {"active": True, **session}