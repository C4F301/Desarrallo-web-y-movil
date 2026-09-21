
from fastapi import FastAPI

app = FastAPI(
    title = "Backend API",
    description = "API ubicada en un host diferente al API Gateway"
)

@app.get("/health")
def health():
    return{
        "status": "OK",
        "service": "Backend API"
    }
    
@app.get("/products")
def products():
    return{
