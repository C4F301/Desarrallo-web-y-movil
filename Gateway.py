import os
import secrets
import httpx
from fastapi import FastAPI, Depends, HTTPException, Request, Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

app = FastAPI(
    title="Secure Local API Gateway",
    description="API Gateway con Bearer Token"
)

security = HTTPBearer(auto_error=False)

BACKEND_URL = os.getenv("BACKEND_URL", "http://127.0.0.1:9000")

CLIENT_TOKEN = os.getenv("CLIENT_TOKEN")
BACKEND_SHARED_SECRET = os.getenv("BACKEND_SHARED_SECRET")

if not CLIENT_TOKEN or not BACKEND_SHARED_SECRET:
    raise RuntimeError("CLIENT_TOKEN o BACKEND_SHARED_SECRET no configurados")

async def authenticate_client(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials is None:
        raise HTTPException(status_code=401, detail="Bearer token requerido")

    received_token = credentials.credentials
    valid = secrets.compare_digest(received_token, CLIENT_TOKEN)

    if not valid:
        raise HTTPException(status_code=401, detail="Token invalido")

    return
    {
        "client_id": "student-client",
        "backend_secret": BACKEND_SHARED_SECRET
    }

@app.get("/health")
def health():
    return {"status": "OK", "service": "API Gateway"}

@app.api_route("/api/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE"])

async def proxy(path: str, request: Request, auth=Depends(authenticate_client)):
    target_url = f"{BACKEND_URL}/{path}"
    
    body = await request.body()

    gateway_headers ={
        "X-Gateway-Secret": auth["backend_secret"],
        "X-Authenticated-Client": auth["client_id"]
    }
    
    content_type = request.headers.get("content-type")
    
    if content_type:
        gateway_headers["content-type"] = content_type

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            upstream = await client.request(
                method=request.method,
                url=target_url,
                params=request.query_params,
                content=body,
                headers=gateway_headers
            )
            
    except httpx.RequestError:
        raise HTTPException(status_code=502, detail="Backend no disponible")

    response_headers = {}
    
    if "content-type" in upstream.headers:
        response_headers["content-type"] = upstream.headers["content-type"]

    return Response(content=upstream.content, status_code=upstream.status_code, headers=response_headers)