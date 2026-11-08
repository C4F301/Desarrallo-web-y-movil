import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def seed():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["pizzeria"]

    # Limpiar y reinsertar catálogo de prueba
    await db.pizzas.delete_many({})
    await db.combos.delete_many({})

    pizzas = [
        {"nombre": "Pizza Margherita", "ingredientes": ["Salsa Tomate", "Queso Mozzarella", "Albahaca"], "precio": 8500, "imagen": "img/margherita.jpg"},
        {"nombre": "Pizza Pepperoni", "ingredientes": ["Salsa Tomate", "Mozzarella", "Pepperoni"], "precio": 9500, "imagen": "img/pepperoni.jpg"},
        {"nombre": "Pizza Vegetariana", "ingredientes": ["Salsa Blanca", "Champiñones", "Pimentón"], "precio": 9000, "imagen": "img/veggie.jpg"}
    ]

    combos = [
        {"nombre": "Pack Dupla Student", "descripcion": "2 Pizzas Familiares + Bebida 1.5L", "precio": 17500, "imagen": "img/combo1.jpg"},
        {"nombre": "Promo Casona UNAB", "descripcion": "1 Pizza Personalizada + 2 Jugos Naturales", "precio": 12000, "imagen": "img/combo2.jpg"}
    ]

    await db.pizzas.insert_many(pizzas)
    await db.combos.insert_many(combos)
    print("¡Base de datos MongoDB poblada exitosamente!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed())