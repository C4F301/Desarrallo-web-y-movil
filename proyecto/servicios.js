
const respuestaPizzas = 
{

    "status": 200,
    "message": "Productos obtenidos correctamente",
    "dato": 
    [
        {

            _id: "6a9f1d1d290a1c36dee29c7e",
            nombre: "margarita",
            ingredientes: ["Salsa de tomate", "Mozzarella", "albahaca"],
            precio: 8000,
            imagen: "FALTA"

        },

        {

            _id: "6a9f1d1d290a1c36dee29c7f",
            nombre: "Pepperoni",
            ingredientes: ["Salsa de tomate", "Mozzarella", "Pepperoni"],
            precio: 9500,
            imagen: "FALTA"

        },

        {

            _id: "6a9f1d1d290a1c36dee29c80",
            nombre: "Hawaiana",
            ingredientes: ["Salsa de tomate", "Mozzarella", "Jamón", "Piña"],
            precio: 9000,
            imagen: "FALTA"

        },

        {

            _id: "6a9f1d1d290a1c36dee29c81",
            nombre: "Cuatro Quesos",
            ingredientes: ["Mozzarella", "Parmesano", "Gorgonzola", "Provolone"],
            precio: 10000,
            imagen: "FALTA"

        },

        {

            _id: "6a9f1d1d290a1c36dee29c82",
            nombre: "Vegetariana",
            ingredientes: ["Salsa de tomate", "Mozzarella", "Pimientos", "Cebolla", "Champiñones"],
            precio: 9200,
            imagen: "FALTA"

        },

        {

            _id: "6a9f1d1d290a1c36dee29c83",
            nombre: "Napolitana",
            ingredientes: ["Salsa de tomate", "Mozzarella", "Tomate fresco", "Orégano"],
            precio: 8800,
            imagen: "FALTA"

        },

        {

            _id: "6a9f1d1d290a1c36dee29c84",
            nombre: "Carbonara",
            ingredientes: ["Crema", "Mozzarella", "Tocino", "Parmesano"],
            precio: 9800,
            imagen: "FALTA"

        },

        {

            _id: "6a9f1d1d290a1c36dee29c85",
            nombre: "Mexicana",
            ingredientes: ["Salsa de tomate", "Mozzarella", "Carne molida", "Jalapeño", "Pimenton"],
            precio: 10200,
            imagen: "FALTA"

        }

    ]

};

const contadorPizzas = document.getElementById("contenedorPizzas");

respuestaPizzas.data.forEach(pizza => 
{

    const columna = document.createElement("div");
    columna.className = "col-12 col-md-6 col-lg-4";

    const bloque = document.createElement("div");
    bloque.className = "card h-100 shadow";

    bloque.innerHTML = 
    `
    
        <img
            src="${pizza.imagen}"
            class="card-img-top p-3"
            alt="${pizza.nombre}"
            style="height: 250px; object-fit: contain;"
        >

        <div class="card-body d-flex flex-column">

            <h5 class="card-title">
                ${pizza.nombre}
            </h5>

            <p class="card-text">
                ${pizza.ingredientes.join(", ")}
            </p>

            <p class="h4 text-success mt-auto">
                $${pizza.precio.toLocaleString("es-CL")}
            </p>
            
            <button
                class="btn btn-warning mt-2"
                onclick="agregarAlCarrito(${pizza._id})"
            >

                <i class="fa fa-shopping-cart"></i>
                Agregar al carrito
            </button>
    
        </div>

    `;

    columna.appendChild(bloque);

    contenedorPizzas.appendChild(columna);

});

function agregarAlCarrito(id)
{

    console.log("Pizza seleccionada:, id");

    const pizza = respuestaPizzas.data.find(pizza => pizza._id === id);

    if(!pizza)
    {

        console.error("No se encontro la pizza con ID", id)
        return;

    }

    else
    {
        carrito.push({
            ...pizza,
            cantidad: 1
        });
    }

    console.log("Carrito actual: ", carrito);

    actualizarCarrito();

}

function quitarDelCarrito(id)
{

    carrito = carrito.filter(pizza => pizza._id !== id);

    console.log("Carrito despues de quitar: ", carrito);

    actualizarCarrito();

}

function actualizarCarrito()
{
 
    const listaCarrito = document.getElementById("listaCarrito");
    const contadorCarrito = document.getElementById("contadorCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) 
    {
 
        listaCarrito.innerHTML = `
        
        <p class = "text-muted">
            El carrito esta vacio
        </p>
        `;
 
        contadorCarrito.textContent = 0;
        totalCarrito.textContent = 0;
 
        return;

    }

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(pizza => 
    {
        const subTotal = pizza.precio * pizza.cantidad;
        total += subTotal;
        cantidadTotal += pizza.cantidad;

        listaCarrito.innerHTML += `
        
        <div class="card mb-2">
            <div class="card-body">
 
                <h6>
 
                    ${pizza.nombre}
 
                </h6>
 
                <p class="mb-1">
                    precio:
                    $${pizza.precio.toLocaleString("es-CL")}
                </p>
 
                <p class="mb-1">
                    cantidad:
                    ${pizza.cantidad}
                </p>
 
                <strong>
                    subtotal:
                    $${subTotal.toLocaleString("es-CL")}
                </strong>
 
                <div class="mt-2">
                    <button class="btn btn-sm btn-outline-danger" onclick="quitarDelCarrito(${pizza.id})">
                        <i class="fa fa-trash"></i>
                        Quitar
                    </button>
                </div>
            </div>
        </div>
 
        `;

    });

    contadorCarrito.textContent = cantidadTotal;
    totalCarrito.textContent = total.toLocaleString("es-CL");

}

function finalizarCompra()
{
 
    if (carrito.length === 0)
    {
        alert("Tu carrito esta vacio. Agrega productos antes de finalizar.");
        return;
    }
 
    alert("Gracias por tu compra");
 
    carrito = [];
    actualizarCarrito();
 
}