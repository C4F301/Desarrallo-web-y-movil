from fastapi import FastAPI, HTTPException, Header, Depends
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
import logging
import secrets
import os

logging.basicConfig(level=logging.INFO, format="%(asctime)s [INVENTORY] %(message)s", datefmt="%H:%M:%S")
log = logging.getLogger("inventory")

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
SHARED_SECRET = os.getenv("BACKEND_SHARED_SECRET", "mi_secreto_compartido")
SERVICE_KEY = os.getenv("SERVICE_KEY", "gql-secret-key")

client: AsyncIOMotorClient = None
db = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, db
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client["pizzeria"]
    log.info("Conectado a MongoDB (%s) base=pizzeria", MONGODB_URL)
    yield
    client.close()

def verificar_secreto(
    x_gateway_secret: str = Header(default=""),
    x_service_key: str = Header(default=""),
):
    if secrets.compare_digest(x_gateway_secret, SHARED_SECRET):
        log.info("Secreto del Gateway verificado OK -> se permite la llamada")
        return
    if x_service_key and secrets.compare_digest(x_service_key, SERVICE_KEY):
        log.info("Service-Key del GraphQL Gateway verificada OK -> se permite la llamada")
        return
    log.warning("Secreto AUSENTE o INVÁLIDO -> 403 (llamada bloqueada)")
    raise HTTPException(status_code=403, detail="Acceso no autorizado al backend")

app = FastAPI(title="Inventory Service - La Fornace", lifespan=lifespan)

@app.get("/items", dependencies=[Depends(verificar_secreto)])
async def listar_pizzas():
    log.info("MongoDB: db.pizzas.find() (consulta de catálogo)")
    cursor = db.pizzas.find()
    pizzas = []
    async for doc in cursor:
        pizzas.append({
            "_id": str(doc["_id"]),
            "nombre": doc.get("nombre", ""),
            "ingredientes": doc.get("ingredientes", []),
            "precio": doc.get("precio", 0),
            "imagen": doc.get("imagen", "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500")
        })
    log.info("MongoDB: %d pizzas leídas", len(pizzas))
    return pizzas

@app.get("/combos", dependencies=[Depends(verificar_secreto)])
async def listar_combos():
    log.info("MongoDB: db.combos.find() (consulta de combos)")
    cursor = db.combos.find()
    combos = []
    async for doc in cursor:
        combos.append({
            "_id": str(doc["_id"]),
            "nombre": doc.get("nombre", ""),
            "descripcion": doc.get("descripcion", ""),
            "precio": doc.get("precio", 0),
            "imagen": doc.get("imagen", "")
        })
    log.info("MongoDB: %d combos leídos", len(combos))
    return combos