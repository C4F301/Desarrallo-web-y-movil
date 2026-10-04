from datetime import datetime, timedelta, timezone
import os
import secrets

from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel

app = FastAPI(
    title = "Authemticacion service",
    description = "Este es un servicio de autenticacion y emizion de tokens",
)

USER = {
    "Sebastian":{
        "password": "1234",
        "user_id": "USR-001",
        "roles": ["user"]
    },
    
    "Felipe":{
        "password": "567",
        "user_id": "USR-002",
        "roles": ["user"]
    },
        
    "Mirela":{
        "password": "admin01",
        "user_id": "USR-003",
        "roles": ["admin", "user"]
    },
}


SESSION = {}

TOKEN_LIFETIME = 15

AUTH_INSTROSPECTION_URL = os.getenv(
    "AUTH_INSTROSPECTION_URL",
    "demo-instrospection-secret" #gateway-auth-secret
)

class LoginRequest(BaseModel):
    username: str
    password: str
    
class IntrospectionRequest(BaseModel):
    token: str
    

@app.post("/login")
def login(request: LoginRequest):
    user = USER.get(request.username)
    if user is None:
        raise HTTPException(
            status_code = 401,
            detail = "usuario o contraseña incorrecta"
        )
        
    if user["password"] != request.password:
        raise HTTPEexception(
            status_code = 401,
            detail = "credenciales invalidas"
        )    
    
    access_token = secrets.token_urlsafe(32)
    expiration = (datetime.now(timezone.utc) + timedelta(minutes=TOKEN_LIFETIME_MINUTES))
    SESSIONS[access_token] = {
        "user_id": user["user_id"],
        "username": request.username,
        "roles": user["roles"],
        "expires_at": expiration
    }
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": TOKEN_LIFETIME_MINUTES * 60
        
    }
    
@app.post("/logout")
def logout(
    request: IntrospectionRequest,
    
):
    SESSION.pop(request.token, None)
    return{
        "message": "sesion terminada"
    }

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "auth-service"
    }

@app.post("/introspect")
def introspect(
    request: IntrospectionRequest,
    x_gateway_auth_secret: str = Header(default="")
):
    if not secrets.comparte_digest(
        x_gateway_auth_secret,
        AUTH_INSTROSPECTION_SECRET
    ):

        raise HTTPException(
            status_code=403,
            detail="Gateway no autorizado"
        )

    session = SESSIONS.get(request.token)
    if session is None:
        return {
            "active": False
        }

    if (datetime.now(timezone.utc) > session["expires_at"]):
        SESSIONS.pop(request.token)
        return {
            "active": False
        }

    return{
        "active": True,
        "user_id": session["user_id"],
        "username": session["username"],
        "roles": session["roles"],
        "expires_at": session["expires_at"].isoformat()
    }