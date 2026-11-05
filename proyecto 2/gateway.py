import os, secrets, httpx
from fastapi import FastAPI, Depends, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Secure API Gateway - La Fornace")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

INVENTORY_URL = os.getenv("INVENTORY_URL", "http://127.0.0.1:8002")
ORDERS_URL = os.getenv("ORDERS_URL", "http://127.0.0.1:8003")
SHARED_SECRET = os.getenv("BACKEND_SHARED_SECRET", "mi_secreto_compartido")

@app.api_route("/api/v1/{service}/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def proxy(service: str, path: str, request: Request):
    if service == "inventory":
        target_url = f"{INVENTORY_URL}/{path}"
    elif service == "orders":
        target_url = f"{ORDERS_URL}/{path}"
    else:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")

    body = await request.body()
    headers = {"X-Gateway-Secret": SHARED_SECRET}
    
    if request.headers.get("content-type"):
        headers["content-type"] = request.headers.get("content-type")

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            res = await client.request(
                request.method,
                target_url,
                params=request.query_params,
                content=body,
                headers=headers
            )
    except httpx.RequestError:
        raise HTTPException(status_code=502, detail="Microservicio no disponible")

    return Response(
        content=res.content,
        status_code=res.status_code,
        headers={"content-type": res.headers.get("content-type", "application/json")}
    )