from typing import List, Optional
from fastapi import FastAPI, HTTPException, Header, status
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
from bson import ObjectId
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

app = FastAPI(title="Orders Service - La Fornace", lifespan=lifespan)

class PizzaPersonalizadaIn(BaseModel):
    tamano: Optional[str] = "familiar"
    salsa: Optional[str] = "bbq"
    extras: Optional[List[str]] = []

class ItemPedidoIn(BaseModel):
    product_id: Optional[str] = None
    id: Optional[str] = None
    precio: Optional[float] = None
    personalizada: Optional[PizzaPersonalizadaIn] = None
    cantidad: int = 1

class CrearPedidoIn(BaseModel):
    items: List[ItemPedidoIn]
    tipo_entrega: Optional[str] = "despacho"
    direccion: Optional[str] = "Av. Siempre Viva 742"
    local_id: Optional[str] = "casona"

@app.post("/orders", status_code=status.HTTP_201_CREATED)
async def crear_orden(pedido: CrearPedidoIn, x_gateway_secret: str = Header(default="")):
    if x_gateway_secret != SHARED_SECRET:
        raise HTTPException(status_code=403, detail="Acceso no autorizado al backend")

    PRECIOS_BASE_CUSTOM = {"mediana": 7000, "familiar": 12000, "familiar xl": 15000}
    PRECIO_EXTRA = 1000

    total_calculado = 0.0

    for item in pedido.items:
        p_id = item.product_id or item.id
        precio_item = 0.0

        # 1. Intentar obtener el precio desde MongoDB si hay un ID válido
        if p_id and db is not None:
            try:
                # Buscar en colección pizzas o en combos
                prod = await db.pizzas.find_one({"_id": ObjectId(p_id)})
                if not prod:
                    prod = await db.combos.find_one({"_id": ObjectId(p_id)})
                
                if prod and "precio" in prod:
                    precio_item = float(prod["precio"])
            except Exception:
                pass

        # 2. Si no se encontró en DB usar el precio enviado desde el frontend
        if precio_item == 0.0 and item.precio:
            precio_item = float(item.precio)

        # 3. Si es pizza personalizada
        if precio_item == 0.0 and item.personalizada:
            tamano_key = (item.personalizada.tamano or "familiar").lower()
            base = PRECIOS_BASE_CUSTOM.get(tamano_key, 12000)
            extras_costo = len(item.personalizada.extras or []) * PRECIO_EXTRA
            precio_item = base + extras_costo

        # 4. Respaldo por defecto en caso de no hallar precio
        if precio_item == 0.0:
            precio_item = 9500.0

        total_calculado += precio_item * item.cantidad

    doc_orden = {
        "items": [item.model_dump() for item in pedido.items],
        "tipo_entrega": pedido.tipo_entrega,
        "direccion": pedido.direccion,
        "local_id": pedido.local_id,
        "total": total_calculado,
        "estado": "PENDIENTE_PAGO"
    }
    
    try:
        res = await db.orders.insert_one(doc_orden)
        nuevo_id = str(res.inserted_id)
    except Exception:
        nuevo_id = str(ObjectId())

    return {
        "id": nuevo_id,
        "estado": "PENDIENTE_PAGO",
        "total": total_calculado,
        "moneda": "CLP"
    }

@app.post("/contact", status_code=status.HTTP_201_CREATED)
async def registrar_contacto(datos: dict):
    if db is not None:
        await db.contactos.insert_one(datos)
    return {
        "id": "msg_01",
        "estado": "RECIBIDO"
    }