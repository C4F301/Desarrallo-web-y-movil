import os
import logging
import httpx
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO, format="%(asctime)s [GATEWAY] %(message)s", datefmt="%H:%M:%S")
log = logging.getLogger("gateway")
logging.getLogger("httpx").setLevel(logging.WARNING)

app = FastAPI(title="Secure API Gateway - La Fornace")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

AUTH_URL = os.getenv("AUTH_URL", "http://127.0.0.1:8001")
INVENTORY_URL = os.getenv("INVENTORY_URL", "http://127.0.0.1:8002")
ORDERS_URL = os.getenv("ORDERS_URL", "http://127.0.0.1:8003")
SHARED_SECRET = os.getenv("BACKEND_SHARED_SECRET", "mi_secreto_compartido")
AUTH_INTROSPECTION_SECRET = os.getenv("AUTH_INTROSPECTION_SECRET", "demo-secret")

# El catálogo (inventory GET), login, registro y contacto son públicos.
# Comprar (orders POST) exige autenticación validada con Auth Service.
def es_publica(service: str, path: str, method: str) -> bool:
    if service == "auth" and path in ("login", "register") and method == "POST":
        return True
    if service == "inventory" and method == "GET":
        return True
    if service == "orders" and path == "contact" and method == "POST":
        return True
    return False

ROLES_REQUERIDOS = {
    ("orders", "POST"): {"cliente", "admin"},
}

async def validar_token(token: str) -> dict:
    log.info("Pidiendo validación del token al Auth Service (%s/introspect)", AUTH_URL)
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            res = await client.post(
                f"{AUTH_URL}/introspect",
                json={"token": token},
                headers={"X-Gateway-Auth-Secret": AUTH_INTROSPECTION_SECRET},
            )
    except httpx.RequestError:
        log.error("Auth Service no disponible -> 503")
        raise HTTPException(status_code=503, detail="Auth Service no disponible")

    if res.status_code != 200:
        log.error("Auth Service respondió %s -> 502", res.status_code)
        raise HTTPException(status_code=502, detail="Error al validar con Auth Service")
    return res.json()

@app.api_route("/api/v1/{service}/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def proxy(service: str, path: str, request: Request):
    log.info("Petición recibida: %s /%s/%s", request.method, service, path)

    if service == "inventory":
        target_url = f"{INVENTORY_URL}/{path}"
    elif service == "orders":
        target_url = f"{ORDERS_URL}/{path}"
    elif service == "auth" and path in ("login", "register"):
        target_url = f"{AUTH_URL}/{path}"
    else:
        log.warning("Servicio no encontrado: %s/%s -> 404", service, path)
        raise HTTPException(status_code=404, detail="Servicio no encontrado")

    headers = {"X-Gateway-Secret": SHARED_SECRET}

    if es_publica(service, path, request.method):
        log.info("Ruta pública: no requiere token")
    else:
        auth_header = request.headers.get("authorization", "")
        if not auth_header.lower().startswith("bearer "):
            log.warning("Sin token Bearer -> 401 (no se enruta)")
            raise HTTPException(status_code=401, detail="Debes iniciar sesión o crear una cuenta para comprar")

        token = auth_header[7:].strip()
        sesion = await validar_token(token)
        if not sesion.get("active"):
            log.warning("Auth Service: token inválido o expirado -> 401 (no se enruta)")
            raise HTTPException(status_code=401, detail="Token inválido o expirado")
        log.info("Auth Service: token ACTIVO user=%s roles=%s", sesion.get("user_id"), sesion.get("roles"))

        requeridos = ROLES_REQUERIDOS.get((service, request.method))
        if requeridos and not requeridos.intersection(sesion.get("roles", [])):
            log.warning("Autorización DENEGADA: roles %s no incluyen %s -> 403", sesion.get("roles"), sorted(requeridos))
            raise HTTPException(status_code=403, detail="Rol sin permiso para esta operación")
        log.info("Autorización OK para %s %s", request.method, service)

        headers["X-User-Id"] = str(sesion.get("user_id", ""))
        headers["X-User-Roles"] = ",".join(sesion.get("roles", []))

    body = await request.body()
    if request.headers.get("content-type"):
        headers["content-type"] = request.headers.get("content-type")

    log.info("Enrutando %s -> %s", request.method, target_url)
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            res = await client.request(
                request.method,
                target_url,
                params=request.query_params,
                content=body,
                headers=headers,
            )
    except httpx.RequestError:
        log.error("Microservicio no disponible: %s -> 502", target_url)
        raise HTTPException(status_code=502, detail="Microservicio no disponible")

    log.info("Respuesta del backend: %s (%s)", res.status_code, service)
    return Response(
        content=res.content,
        status_code=res.status_code,
        headers={"content-type": res.headers.get("content-type", "application/json")},
    )