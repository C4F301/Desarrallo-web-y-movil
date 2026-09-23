// Variable global para almacenar los ítems del carrito
let carrito = [];

// Base de datos local
const respuestaPizzas = {
    "status": 200,
    "message": "Productos obtenidos correctamente",
    "dato": [
        {
            _id: "6a9f1d1d290a1c36dee29c7e",
            nombre: "Margarita",
            ingredientes: ["Salsa de tomate", "Mozzarella", "Albahaca"],
            precio: 8000,
            imagen: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop"
        },
        {
            _id: "6a9f1d1d290a1c36dee29c7f",
            nombre: "Pepperoni",
            ingredientes: ["Salsa de tomate", "Mozzarella", "Pepperoni"],
            precio: 9500,
            imagen: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop"
        },
        {
            _id: "6a9f1d1d290a1c36dee29c80",
            nombre: "Hawaiana",
            ingredientes: ["Salsa de tomate", "Mozzarella", "Jamón", "Piña"],
            precio: 9000,
            imagen: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop"
        },
        {
            _id: "6a9f1d1d290a1c36dee29c81",
            nombre: "Cuatro Quesos",
            ingredientes: ["Mozzarella", "Parmesano", "Gorgonzola", "Provolone"],
            precio: 10000,
            imagen: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop"
        },
        {
            _id: "6a9f1d1d290a1c36dee29c82",
            nombre: "Vegetariana",
            ingredientes: ["Salsa de tomate", "Mozzarella", "Pimientos", "Cebolla", "Champiñones"],
            precio: 9200,
            imagen: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500&auto=format&fit=crop"
        },
        {
            _id: "6a9f1d1d290a1c36dee29c85",
            nombre: "Mexicana",
            ingredientes: ["Salsa de tomate", "Mozzarella", "Carne molida", "Jalapeño", "Pimenton"],
            precio: 10200,
            imagen: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500&auto=format&fit=crop"
        }
    ],
    "combos": [
        {
            _id: "combo_pareja",
            nombre: "Combo Pareja 🍕🥤",
            descripcion: "1 Pizza Mediana a elección + 2 Bebidas 350ml + Palos de ajo",
            precio: 14990,
            imagen: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop"
        },
        {
            _id: "combo_familiar",
            nombre: "Pack Familiar Fornace 👨‍👩‍👧‍👦",
            descripcion: "2 Pizzas Familiares a elección + 1 Bebida 1.5L + Palos de Ajo",
            precio: 23990,
            imagen: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=500&auto=format&fit=crop"
        }
    ]
};

// Cargar catálogo al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarCombos();
    cargarPizzasTradicionales();
});

// Renderizar Combos y Promociones
function cargarCombos() {
    const contenedorCombos = document.getElementById("contenedorCombos");
    if (!contenedorCombos) return;

    respuestaPizzas.combos.forEach(combo => {
        const col = document.createElement("div");
        col.className = "col-12 col-md-6";
        col.innerHTML = `
            <div class="card h-100 border-warning border-2 shadow-sm">
                <div class="row g-0 h-100 align-items-center">
                    <div class="col-md-5">
                        <img src="${combo.imagen}" class="img-fluid rounded-start h-100 style="object-fit: cover;" alt="${combo.nombre}">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body d-flex flex-column h-100">
                            <span class="badge bg-danger mb-2 w-auto me-auto">¡Super Promo!</span>
                            <h5 class="card-title fw-bold">${combo.nombre}</h5>
                            <p class="card-text small text-muted">${combo.descripcion}</p>
                            <p class="h4 text-success fw-bold mt-auto">$${combo.precio.toLocaleString("es-CL")}</p>
                            <button class="btn btn-warning mt-2 fw-bold" onclick="agregarComboAlCarrito('${combo._id}')">
                                <i class="fa fa-shopping-cart"></i> Agregar Promo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedorCombos.appendChild(col);
    });
}

// Renderizar Pizzas Tradicionales
function cargarPizzasTradicionales() {
    const contenedorPizzas = document.getElementById("contenedorPizzas");
    if (!contenedorPizzas) return;

    respuestaPizzas.dato.forEach(pizza => {
        const col = document.createElement("div");
        col.className = "col-12 col-md-6 col-lg-4";
        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0">
                <img src="${pizza.imagen}" class="card-img-top p-2" alt="${pizza.nombre}" style="height: 200px; object-fit: cover; border-radius: 15px;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold">${pizza.nombre}</h5>
                    <p class="card-text text-muted small">${pizza.ingredientes.join(", ")}</p>
                    <p class="h4 text-danger fw-bold mt-auto">$${pizza.precio.toLocaleString("es-CL")}</p>
                    <button class="btn btn-outline-dark mt-2 fw-bold" onclick="agregarAlCarrito('${pizza._id}')">
                        <i class="fa fa-shopping-cart"></i> Agregar
                    </button>
                </div>
            </div>
        `;
        contenedorPizzas.appendChild(col);
    });
}

// Lógica de Agregar Pizza Tradicional
function agregarAlCarrito(id) {
    const pizza = respuestaPizzas.dato.find(p => p._id === id);
    if (!pizza) return;

    const itemExistente = carrito.find(p => p._id === id);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            _id: pizza._id,
            nombre: pizza.nombre,
            precio: pizza.precio,
            detalles: pizza.ingredientes.join(", "),
            cantidad: 1
        });
    }
    actualizarCarrito();
}

// Lógica de Agregar Combo
function agregarComboAlCarrito(id) {
    const combo = respuestaPizzas.combos.find(c => c._id === id);
    if (!combo) return;

    const itemExistente = carrito.find(p => p._id === id);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            _id: combo._id,
            nombre: combo.nombre,
            precio: combo.precio,
            detalles: "Promoción Delivery",
            cantidad: 1
        });
    }
    actualizarCarrito();
}

// Lógica de "Arma tu Pizza"
function agregarPizzaPersonalizada() {
    const tamañoSelect = document.getElementById("customTamano");
    const salsaSelect = document.getElementById("customSalsa");

    const tamañoNombre = tamañoSelect.options[tamañoSelect.selectedIndex].text;
    const precioBase = parseInt(tamañoSelect.value);
    const salsa = salsaSelect.value;

    // Obtener ingredientes seleccionados
    const checkboxes = document.querySelectorAll('.ingredient-check:checked');
    let ingredientes = [];
    let precioIngredientes = 0;

    checkboxes.forEach(cb => {
        ingredientes.push(cb.dataset.nombre);
        precioIngredientes += parseInt(cb.value);
    });

    const precioTotal = precioBase + precioIngredientes;
    const idUnico = "custom_" + Date.now();

    const descripcionDetallada = `Base: ${salsa}. Toppings: ${ingredientes.length > 0 ? ingredientes.join(", ") : "Sin extra toppings"}`;

    carrito.push({
        _id: idUnico,
        nombre: `Pizza Armada (${tamañoNombre.split(" -")[0]})`,
        precio: precioTotal,
        detalles: descripcionDetallada,
        cantidad: 1
    });

    actualizarCarrito();

    // Resetear formulario y cerrar Modal
    document.getElementById("formCustomPizza").reset();
    const modalEl = document.getElementById('modalCustomPizza');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
}

// Control del Carrito
function quitarDelCarrito(id) {
    carrito = carrito.filter(item => item._id !== id);
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    const contadorCarrito = document.getElementById("contadorCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    if (!listaCarrito) return;
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = `<p class="text-muted text-center my-4">El carrito está vacío</p>`;
        contadorCarrito.textContent = 0;
        totalCarrito.textContent = 0;
        return;
    }

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(item => {
        const subTotal = item.precio * item.cantidad;
        total += subTotal;
        cantidadTotal += item.cantidad;

        listaCarrito.innerHTML += `
            <div class="card mb-2 shadow-sm">
                <div class="card-body p-2 d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-0 fw-bold">${item.nombre}</h6>
                        <small class="text-muted d-block">${item.detalles}</small>
                        <small class="text-dark fw-bold">$${item.precio.toLocaleString("es-CL")} x ${item.cantidad}</small>
                        <div><strong>Subtotal: $${subTotal.toLocaleString("es-CL")}</strong></div>
                    </div>
                    <button class="btn btn-sm btn-outline-danger ms-2" onclick="quitarDelCarrito('${item._id}')">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    contadorCarrito.textContent = cantidadTotal;
    totalCarrito.textContent = total.toLocaleString("es-CL");
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de finalizar.");
        return;
    }

    alert("¡Gracias por tu pedido en La Fornace! En breve iniciaremos el delivery.");
    carrito = [];
    actualizarCarrito();
}