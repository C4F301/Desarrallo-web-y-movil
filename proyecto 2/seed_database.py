import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def seed():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["pizzeria"]

    await db.pizzas.delete_many({})
    await db.combos.delete_many({})

    pizzas = [
        {
            "nombre": "Pizza Margherita",
            "ingredientes": ["Salsa Tomate", "Queso Mozzarella", "Albahaca Fresca", "Aceite de Oliva"],
            "precio": 8500,
            "imagen": "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=80&w=1236&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        },
        {
            "nombre": "Pizza Pepperoni",
            "ingredientes": ["Salsa Tomate", "Mozzarella", "Doble Pepperoni"],
            "precio": 9500,
            "imagen": "https://plus.unsplash.com/premium_photo-1667682942148-a0c98d1d70db?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        },
        {
            "nombre": "Pizza Vegetariana",
            "ingredientes": ["Salsa Blanca", "Champiñones", "Pimentón", "Aceitunas Negras", "Choclo"],
            "precio": 9000,
            "imagen": "https://images.unsplash.com/photo-1609159085964-e47ec0804449?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        },
        {
            "nombre": "Pizza Cuatro Quesos",
            "ingredientes": ["Mozzarella", "Queso Azul", "Parmesano", "Provolone", "Orégano"],
            "precio": 10500,
            "imagen": "https://images.unsplash.com/photo-1612948928338-53dd61a5ad5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        },
        {
            "nombre": "Pizza Napolitana",
            "ingredientes": ["Salsa Tomate", "Mozzarella", "Tomate en Rodajas", "Jamón", "Aceitunas"],
            "precio": 9200,
            "imagen": "https://plus.unsplash.com/premium_photo-1690056321981-dfe9e75e0247?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        },
        {
            "nombre": "Pizza BBQ Pollo Tocino",
            "ingredientes": ["Salsa BBQ", "Mozzarella", "Pechuga de Pollo", "Tocino Crispy", "Cebolla Morada"],
            "precio": 11000,
            "imagen": "https://images.unsplash.com/photo-1604917869287-3ae73c77e227?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        },
{
            "nombre": "Pizza Hawaiana",
            "ingredientes": ["Salsa Tomate", "Mozzarella", "Jamón Pierna", "Piña Caramelizada"],
            "precio": 9500,
            "imagen": "https://images.unsplash.com/photo-1562835155-a7c2a225e97d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        },
        {
            "nombre": "Pizza La Fornace Especial",
            "ingredientes": ["Salsa Tomate", "Mozzarella", "Carne Mechada", "Champiñones", "Pimentón Asado"],
            "precio": 11900,
            "imagen": "https://images.unsplash.com/photo-1562835155-a7c2a225e97d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        }
    ]

    combos = [
        {
            "nombre": "Pack Dupla Student",
            "descripcion": "2 Pizzas Familiares + Bebida 1.5L",
            "precio": 17500,
            "imagen": "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=500"
        },
        {
            "nombre": "Promo Casona UNAB",
            "descripcion": "1 Pizza Personalizada + 2 Jugos Naturales",
            "precio": 12000,
            "imagen": "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=500"
        },
        {
            "nombre": "Combo Junta Suprema",
            "descripcion": "3 Pizzas Familiares a elección + Palitos de Ajo + 2 Bebidas 1.5L",
            "precio": 26900,
            "imagen": "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500"
        }
    ]

    await db.pizzas.insert_many(pizzas)
    await db.combos.insert_many(combos)
    print(f"¡Catálogo actualizado con fotos reales: {len(pizzas)} pizzas y {len(combos)} combos!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed())