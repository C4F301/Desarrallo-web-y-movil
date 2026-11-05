from typing import List, Optional
from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
import os

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
SHARED_SECRET = os.getenv("BACKEND_SHARED_SECRET", "mi_secreto_compartido")

client: AsyncIOMotorClient = None
db = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, db
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client["pizzeria"]
    yield
    client.close()

app = FastAPI(title="Inventory Service - La Fornace", lifespan=lifespan)

@app.get("/items")
async def listar_pizzas():
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
    return pizzas

@app.get("/combos")
async def listar_combos():
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
    return combos