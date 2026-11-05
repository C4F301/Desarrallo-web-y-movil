const API_BASE_URL = "http://localhost:8000/api/v1";
let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarCombos();
    cargarPizzasTradicionales();
});

// --- 1. CARGAR CATÁLOGO DE PIZZAS DESDE INVENTORY SERVICE ---
async function cargarPizzasTradicionales() {
    const contenedorPizzas = document.getElementById("contenedorPizzas");
    if (!contenedorPizzas) return;

    try {
        const response = await fetch(`${API_BASE_URL}/inventory/items`);
        const pizzas = await response.json();

        contenedorPizzas.innerHTML = "";
        pizzas.forEach(pizza => {
            const col = document.createElement("div");
            col.className = "col-12 col-md-6 col-lg-4";
            
            const idPizza = String(pizza._id || pizza.id || "p_def");
            const nombre = String(pizza.nombre || "Pizza").replace(/'/g, "\\'");
            const precio = Number(pizza.precio) || 0;
            const ingredientesTexto = Array.isArray(pizza.ingredientes) 
                ? pizza.ingredientes.join(", ") 
                : (pizza.ingredientes || "");

            col.innerHTML = `
                <div class="card h-100 shadow-sm border-0">
                    <img src="${pizza.imagen || ''}" class="card-img-top p-2" alt="${nombre}" style="height: 200px; object-fit: cover; border-radius: 15px;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${nombre}</h5>
                        <p class="card-text text-muted small">${ingredientesTexto}</p>
                        <p class="h4 text-danger fw-bold mt-auto">$${precio.toLocaleString("es-CL")}</p>
                        <button class="btn btn-outline-dark mt-2 fw-bold" onclick="agregarAlCarrito('${idPizza}', '${nombre}', ${precio}, '${ingredientesTexto.replace(/'/g, "\\'")}')">
                            <i class="fa fa-shopping-cart"></i> Agregar
                        </button>
                    </div>
                </div>
            `;
            contenedorPizzas.appendChild(col);
        });
    } catch (error) {
        console.error("Error al cargar pizzas:", error);
    }
}

// --- 2. CARGAR COMBOS Y PROMOCIONES ---
async function cargarCombos() {
    const contenedorCombos = document.getElementById("contenedorCombos");
    if (!contenedorCombos) return;

    try {
        const response = await fetch(`${API_BASE_URL}/inventory/combos`);
        const combos = await response.json();
        contenedorCombos.innerHTML = "";

        combos.forEach(combo => {
            const col = document.createElement("div");
            col.className = "col-12 col-md-6";
            const idCombo = String(combo._id || combo.id || "c_def");
            const nombre = String(combo.nombre || "Combo").replace(/'/g, "\\'");
            const precio = Number(combo.precio) || 0;

            col.innerHTML = `
                <div class="card h-100 border-warning border-2 shadow-sm">
                    <div class="row g-0 h-100 align-items-center">
                        <div class="col-md-5">
                            <img src="${combo.imagen || ''}" class="img-fluid rounded-start h-100" style="object-fit: cover;" alt="${nombre}">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body d-flex flex-column h-100">
                                <span class="badge bg-danger mb-2 w-auto me-auto">¡Super Promo!</span>
                                <h5 class="card-title fw-bold">${nombre}</h5>
                                <p class="card-text small text-muted">${combo.descripcion || ''}</p>
                                <p class="h4 text-success fw-bold mt-auto">$${precio.toLocaleString("es-CL")}</p>
                                <button class="btn btn-warning mt-2 fw-bold" onclick="agregarAlCarrito('${idCombo}', '${nombre}', ${precio}, 'Promoción Delivery')">
                                    <i class="fa fa-shopping-cart"></i> Agregar Promo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            contenedorCombos.appendChild(col);
        });
    } catch (error) {
        console.error("Error al cargar combos:", error);
    }
}

// --- 3. LÓGICA DEL CARRITO DE COMPRAS ---
function agregarAlCarrito(id, nombre, precio, detalles) {
    const itemExistente = carrito.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio: Number(precio), detalles, cantidad: 1 });
    }
    actualizarCarrito();
}

function quitarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
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
        if (contadorCarrito) contadorCarrito.textContent = 0;
        if (totalCarrito) totalCarrito.textContent = 0;
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
                    <button class="btn btn-sm btn-outline-danger ms-2" onclick="quitarDelCarrito('${item.id}')">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    if (contadorCarrito) contadorCarrito.textContent = cantidadTotal;
    if (totalCarrito) totalCarrito.textContent = total.toLocaleString("es-CL");
}

// --- 4. LÓGICA DE PIZZA PERSONALIZADA (MODAL) ---
function agregarPizzaPersonalizada() {
    const tamanoSelect = document.getElementById("customTamano");
    const salsaSelect = document.getElementById("customSalsa");

    let tamanoNombre = "Familiar";
    let precioBase = 10000;

    if (tamanoSelect) {
        precioBase = Number(tamanoSelect.value) || 10000;
        const textoOp = tamanoSelect.options[tamanoSelect.selectedIndex].text;
        tamanoNombre = textoOp.split(" - ")[0] || "Personalizada";
    }

    let salsa = salsaSelect ? salsaSelect.value : "Salsa de Tomate Clásica";

    const checkboxes = document.querySelectorAll('#modalCustomPizza input[type="checkbox"]:checked');
    let extrasNombres = [];
    let costoExtras = 0;

    checkboxes.forEach(cb => {
        const nombreIngrediente = cb.getAttribute("data-nombre") || cb.nextElementSibling?.textContent?.trim() || "Extra";
        const valorExtra = Number(cb.value) || 1000;
        extrasNombres.push(nombreIngrediente);
        costoExtras += valorExtra;
    });

    const precioFinal = precioBase + costoExtras;
    const idUnicoCustom = "custom_" + Date.now();
    const nombreCustom = `Pizza Personalizada (${tamanoNombre})`;
    const detallesCustom = `Salsa: ${salsa} | Extras: ${extrasNombres.length > 0 ? extrasNombres.join(", ") : "Sin extras"}`;

    carrito.push({
        id: idUnicoCustom,
        nombre: nombreCustom,
        precio: precioFinal,
        detalles: detallesCustom,
        cantidad: 1,
        personalizada: {
            tamano: tamanoNombre,
            salsa: salsa,
            extras: extrasNombres
        }
    });

    actualizarCarrito();

    const form = document.getElementById("formCustomPizza");
    if (form) form.reset();

    const modalEl = document.getElementById("modalCustomPizza");
    if (modalEl) {
        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modalInstance.hide();
    }
}

// --- 5. ENVÍO DEL PEDIDO AL BACKEND CON DIRECCIÓN Y LOCAL DINÁMICOS ---
async function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de finalizar.");
        return;
    }

    // Pide la dirección y el local al cliente dinámicamente
    let direccionCliente = prompt("Ingresa la dirección de entrega (Ej: Av. República 239, Santiago):");
    if (!direccionCliente || direccionCliente.trim() === "") {
        direccionCliente = "Dirección no especificada";
    }

    let localSeleccionado = prompt("Ingresa el Local / Sede preferida (Ej: Casona, República, Antonio Varas, Viña del Mar):");
    if (!localSeleccionado || localSeleccionado.trim() === "") {
        localSeleccionado = "casona";
    }

    const payload = {
        items: carrito.map(item => {
            if (item.id && String(item.id).startsWith("custom_")) {
                return {
                    personalizada: item.personalizada || {
                        tamano: "Familiar",
                        salsa: "Salsa BBQ",
                        extras: ["Pepperoni"]
                    },
                    precio: item.precio,
                    cantidad: item.cantidad
                };
            } else {
                return {
                    product_id: item.id || item._id,
                    precio: item.precio,
                    cantidad: item.cantidad
                };
            }
        }),
        tipo_entrega: "despacho",
        direccion: direccionCliente,
        local_id: localSeleccionado
    };

    try {
        const response = await fetch(`${API_BASE_URL}/orders/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            
            const orderID = data.id || data.order_id || data._id || "REGISTRADO";
            const estado = data.estado || "PENDIENTE_PAGO";
            const total = data.total ? `$${Number(data.total).toLocaleString("es-CL")}` : "";

            alert(`¡Gracias por tu compra en La Fornace!\n\nID de Orden registrada: ${orderID}\nDirección: ${direccionCliente}\nLocal: ${localSeleccionado}\nEstado: ${estado}\nTotal: ${total} CLP`);
            
            carrito = [];
            actualizarCarrito();
        } else {
            alert("Error al procesar el pedido en el servidor.");
        }
    } catch (error) {
        console.error("Error en finalizarCompra:", error);
    }
}