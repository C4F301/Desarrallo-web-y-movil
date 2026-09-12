from typing import List, Optional, Dict
from itertools import count 

from fastapi import FastAPI, HTTPException, Query
from pydantic import BasdeModel, Dield

from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from contexlib import asynccontextmanager

#Configuration BD mongodb
MONGODB_URL = "mongodb://localhost:27017"
DB_NAME = "pizzeria"
COLL_NAME = "pizzas"

client = AsyncIOMotorClient | None = None
db = None
coll = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, db, coll
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DB_NAME]
    coll = db[COLL_NAME]
    yield
    client.close()
    
app = FastAPI(title = "Pizzeria API", version = "1.0.0", lifespan=lifespan)

class Item(BaseModel):
    nombre: str = Field(min_length=1, description="Nombre de la pizza")
    precio: float = Field(gt=0, description="Precio > 0")
    tags :  List[str] = Field(default_factory=list)
    activo: bool = True
    
class ItemIn(BaseModel):
nombre: str = Field(min_length=1, description="Nombre de la pizza")
precio: float = Field(gt=0, description="Precio > 0")
tags :  List[str] = Field(default_factory=list)
activo: bool = True
    
class ItemOut(Item):
    id: str

def doc_to_itemout(doc) -> ItemOut:
    return ItemOut(
        id = str(doc["_id"]),
        nombre = doc["nombre"],
        precio = doc["precio"],
        tags = doc.get("tags", []),
        activo = doc.get("activo", True)
    )
    
#End point armas servicios