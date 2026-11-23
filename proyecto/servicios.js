// ===== Configuración =====
const API = "http://localhost:8000/api/v1";
const KEY_TOKEN = "fornace_token";
const KEY_USER = "fornace_user";
const KEY_CARRITO = "fornace_carrito";

// ===== Utilidades =====
function leerLS(clave, defecto) {
    try {
        const v = localStorage.getItem(clave);
        return v ? JSON.parse(v) : defecto;
    } catch (e) { return defecto; }
}
function guardarLS(clave, valor) {
    try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* sin storage */ }
}
function borrarLS(clave) {
    try { localStorage.removeItem(clave); } catch (e) { /* sin storage */ }
}
function esc(texto) {
    const d = document.createElement("div");
    d.textContent = texto == null ? "" : String(texto);
    return d.innerHTML;
}
function clp(n) { return Number(n).toLocaleString("es-CL"); }
function estaLogueado() { return Boolean(leerLS(KEY_TOKEN, null)); }

let carrito = leerLS(KEY_CARRITO, []);
let catalogo = {};

// ===== Inyectar Modal de Cuenta si la página no lo tiene =====
function asegurarModalCuenta() {
    if (document.getElementById("myModal")) return;

    const modalHtml = `
    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="myModalLabel"><i class="fa fa-user-circle me-2"></i> Mi Cuenta</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="d-flex justify-content-center gap-2 mb-4">
                        <button class="btn btn-warning fw-bold w-50" type="button" data-bs-toggle="collapse" data-bs-target="#formLogin" aria-expanded="true" aria-controls="formLogin">
                            Iniciar Sesión
                        </button>
                        <button class="btn btn-outline-dark fw-bold w-50" type="button" data-bs-toggle="collapse" data-bs-target="#formRegistro" aria-expanded="false" aria-controls="formRegistro">
                            Registrarse
                        </button>
                    </div>

                    <div class="collapse show" id="formLogin" data-bs-parent="#myModal">
                        <form>
                            <h5 class="fw-bold mb-3">Ingresar a tu Cuenta</h5>
                            <div class="mb-3">
                                <label for="loginEmail" class="form-label">Correo Electrónico</label>
                                <input type="email" class="form-control" id="loginEmail" name="email" placeholder="tu@email.com" required>
                            </div>
                            <div class="mb-3">
                                <label for="loginPassword" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="loginPassword" name="password" placeholder="••••••••" required>
                            </div>
                            <button type="submit" class="btn btn-warning w-100 fw-bold">Ingresar</button>
                        </form>
                    </div>

                    <div class="collapse" id="formRegistro" data-bs-parent="#myModal">
                        <form>
                            <h5 class="fw-bold mb-3">Crear nueva cuenta</h5>
                            <div class="mb-3">
                                <label for="regNombre" class="form-label">Nombre Completo</label>
                                <input type="text" class="form-control" id="regNombre" name="nombre" placeholder="Ej: Juan Pérez" required>
                            </div>
                            <div class="mb-3">
                                <label for="regEmail" class="form-label">Correo Electrónico</label>
                                <input type="email" class="form-control" id="regEmail" name="email" placeholder="tu@email.com" required>
                            </div>
                            <div class="mb-3">
                                <label for="regPassword" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="regPassword" name="password" placeholder="••••••••" required>
                            </div>
                            <button type="submit" class="btn btn-success w-100 fw-bold">Registrarse</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML("beforeend", modalHtml);
}

function abrirModalCuenta() {
    asegurarModalCuenta();
    const modalEl = document.getElementById("myModal");
    if (modalEl && window.bootstrap) {
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
}

// ===== UI de Sesión y Campo de Dirección en el Carrito =====
function prepararUIUsuario() {
    asegurarModalCuenta();

    const token = leerLS(KEY_TOKEN, null);
    const user = leerLS(KEY_USER, null);
    const btnCuenta = document.getElementById("btnCuentaNavbar") || document.querySelector('[data-bs-target="#myModal"]');

    if (btnCuenta) {
        if (token && user) {
            btnCuenta.className = "btn btn-success fw-bold";
            btnCuenta.innerHTML = `<i class="fa fa-user"></i> ${esc(user)} (Salir)`;
            btnCuenta.removeAttribute("data-bs-toggle");
            btnCuenta.removeAttribute("data-bs-target");
            btnCuenta.removeAttribute("href");
            btnCuenta.onclick = (e) => {
                e.preventDefault();
                borrarLS(KEY_TOKEN);
                borrarLS(KEY_USER);
                carrito = [];
                guardarLS(KEY_CARRITO, carrito);
                alert("Sesión cerrada.");
                window.location.reload();
            };
        } else {
            btnCuenta.className = "btn btn-outline-danger fw-bold";
            btnCuenta.innerHTML = `<i class="fa fa-user"></i> Cuenta`;
            btnCuenta.removeAttribute("href");
            btnCuenta.setAttribute("data-bs-toggle", "modal");
            btnCuenta.setAttribute("data-bs-target", "#myModal");
            btnCuenta.onclick = (e) => {
                e.preventDefault();
                abrirModalCuenta();
            };
        }
    }

    // Insertar campo de dirección en el offcanvas del carrito si aún no existe
    const totalEl = document.getElementById("totalCarrito");
    if (totalEl && !document.getElementById("direccionEntrega")) {
        const contenedorTotal = totalEl.closest(".border-top");
        if (contenedorTotal) {
            const divDir = document.createElement("div");
            divDir.className = "mb-3";
            divDir.innerHTML = `
                <label for="direccionEntrega" class="form-label fw-bold small mb-1">
                    <i class="fa fa-map-marker text-danger"></i> Dirección de Entrega:
                </label>
                <input type="text" id="direccionEntrega" class="form-control form-control-sm"
                    placeholder="Ej: Fernández Concha 700, Las Condes" required>`;
            contenedorTotal.insertBefore(divDir, contenedorTotal.firstChild);
        }
    }
}

// ===== Carrito =====
function renderCarrito() {
    const lista = document.getElementById("listaCarrito");
    const total = document.getElementById("totalCarrito");
    const contador = document.getElementById("contadorCarrito");
    if (!lista) return;

    let suma = 0, unidades = 0;
    if (carrito.length === 0) {
        lista.innerHTML = '<p class="text-muted text-center my-4">El carrito está vacío</p>';
    } else {
        lista.innerHTML = carrito.map((it, i) => {
            suma += it.precio * it.cantidad;
            unidades += it.cantidad;
            return `<div class="d-flex justify-content-between align-items-start border-bottom py-2">
                <div>
                    <div class="fw-bold">${esc(it.nombre)} x${it.cantidad}</div>
                    ${it.detalle ? `<div class="small text-muted">${esc(it.detalle)}</div>` : ""}
                    <div class="small">$${clp(it.precio * it.cantidad)}</div>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="quitarDelCarrito(${i})">&times;</button>
            </div>`;
        }).join("");
    }
    if (total) total.textContent = clp(suma);
    if (contador) contador.textContent = unidades;
    guardarLS(KEY_CARRITO, carrito);
}

function exigirCuenta(mensaje) {
    if (mensaje) alert(mensaje);
    abrirModalCuenta();
}

function agregarAlCarrito(id) {
    if (!estaLogueado()) {
        exigirCuenta("Solo usuarios con cuenta iniciada pueden comprar pizzas. Inicia sesión o regístrate.");
        return;
    }
    const prod = catalogo[id];
    if (!prod) return;
    const existente = carrito.find(it => it.tipo === "catalogo" && it.id === id);
    if (existente) existente.cantidad += 1;
    else carrito.push({ tipo: "catalogo", id, nombre: prod.nombre, precio: prod.precio, cantidad: 1 });
    renderCarrito();
}

function quitarDelCarrito(i) {
    carrito.splice(i, 1);
    renderCarrito();
}

function agregarPizzaPersonalizada() {
    if (!estaLogueado()) {
        exigirCuenta("Debes iniciar sesión o crear una cuenta para armar y comprar tu pizza.");
        return;
    }
    const selTam = document.getElementById("customTamano");
    const selSalsa = document.getElementById("customSalsa");
    if (!selTam || !selSalsa) return;

    const textoTam = selTam.options[selTam.selectedIndex].text.toLowerCase();
    const tamano = textoTam.startsWith("familiar xl") ? "familiar xl"
        : textoTam.startsWith("mediana") ? "mediana" : "familiar";
    const extras = Array.from(document.querySelectorAll(".ingredient-check:checked")).map(c => c.dataset.nombre);
    const precio = Number(selTam.value) + extras.length * 1000;

    carrito.push({
        tipo: "custom",
        nombre: "Pizza personalizada (" + tamano + ")",
        detalle: selSalsa.value + (extras.length ? " + " + extras.join(", ") : ""),
        precio,
        cantidad: 1,
        personalizada: { tamano, salsa: selSalsa.value, extras }
    });
    renderCarrito();

    const modalEl = document.getElementById("modalCustomPizza");
    if (modalEl && window.bootstrap) {
        const m = bootstrap.Modal.getInstance(modalEl);
        if (m) m.hide();
    }
}

// ===== Catálogo Público (Todos pueden ver, solo logueados compran) =====
function tarjetaProducto(p) {
    const id = p._id || p.id;
    const logueado = estaLogueado();
    const botonHtml = logueado
        ? `<button class="btn btn-warning fw-bold" onclick="agregarAlCarrito('${esc(id)}')">Agregar</button>`
        : `<button class="btn btn-outline-secondary btn-sm fw-bold" onclick="exigirCuenta('Crea una cuenta o inicia sesión para comprar pizzas.')"><i class="fa fa-lock"></i> Inicia sesión para comprar</button>`;

    return `<div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
            <img src="${esc(p.imagen)}" class="card-img-top" alt="${esc(p.nombre)}" style="height:200px;object-fit:cover" onerror="this.onerror=null;this.src='img/logo.webp'">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title fw-bold">${esc(p.nombre)}</h5>
                <p class="card-text small text-muted">${esc(p.descripcion || (p.ingredientes || []).join(", "))}</p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                    <span class="fw-bold fs-5">$${clp(p.precio)}</span>
                    ${botonHtml}
                </div>
            </div>
        </div>
    </div>`;
}

async function cargarCatalogo() {
    const contPizzas = document.getElementById("contenedorPizzas");
    const contCombos = document.getElementById("contenedorCombos");
    if (!contPizzas && !contCombos) return;

    try {
        const [rp, rc] = await Promise.all([
            fetch(`${API}/inventory/items`),
            fetch(`${API}/inventory/combos`)
        ]);
        if (!rp.ok || !rc.ok) throw new Error("HTTP " + rp.status + "/" + rc.status);
        const pizzas = await rp.json();
        const combos = await rc.json();

        [...pizzas, ...combos].forEach(p => {
            catalogo[p._id || p.id] = { nombre: p.nombre, precio: p.precio };
        });
        if (contPizzas) contPizzas.innerHTML = pizzas.map(tarjetaProducto).join("");
        if (contCombos) contCombos.innerHTML = combos.map(tarjetaProducto).join("");
    } catch (e) {
        const msg = '<div class="alert alert-danger">No se pudo cargar el catálogo desde el API Gateway.</div>';
        if (contPizzas) contPizzas.innerHTML = msg;
    }
}

// ===== Compra con Dirección (Gateway -> Auth -> Orders -> MongoDB) =====
async function finalizarCompra() {
    const token = leerLS(KEY_TOKEN, null);
    if (!token) {
        await fetch(`${API}/orders/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [] })
        }).catch(() => {});
        exigirCuenta("Debes iniciar sesión o crear una cuenta para finalizar la compra.");
        return;
    }

    if (carrito.length === 0) { alert("El carrito está vacío"); return; }

    const inputDir = document.getElementById("direccionEntrega");
    const direccion = inputDir ? inputDir.value.trim() : "";
    if (!direccion) {
        alert("Por favor ingresa tu dirección de entrega antes de finalizar la compra.");
        if (inputDir) inputDir.focus();
        return;
    }

    const items = carrito.map(it => it.tipo === "custom"
        ? { personalizada: it.personalizada, cantidad: it.cantidad }
        : { product_id: it.id, precio: it.precio, cantidad: it.cantidad });

    try {
        const res = await fetch(`${API}/orders/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
            body: JSON.stringify({
                items,
                tipo_entrega: "despacho",
                direccion: direccion
            })
        });
        const data = await res.json().catch(() => ({}));

        if (res.status === 401) {
            borrarLS(KEY_TOKEN); borrarLS(KEY_USER);
            exigirCuenta("Tu sesión expiró. Inicia sesión nuevamente.");
            return;
        }
        if (!res.ok) {
            alert("No se pudo crear el pedido: " + (data.detail || res.status));
            return;
        }
        alert(
            "¡Pedido creado en MongoDB!\n" +
            "ID: " + data.id + "\n" +
            "Dirección: " + direccion + "\n" +
            "Total: $" + clp(data.total) + " " + data.moneda
        );
        carrito = [];
        if (inputDir) inputDir.value = "";
        renderCarrito();
    } catch (e) {
        alert("No se pudo conectar con el API Gateway.");
    }
}

// ===== Login y Registro con Auto-Login en la misma página =====
function iniciarCuenta() {
    asegurarModalCuenta();

    const formLogin = document.querySelector("#formLogin form");
    if (formLogin) {
        formLogin.addEventListener("submit", async (ev) => {
            ev.preventDefault();
            let aviso = formLogin.querySelector(".aviso-login");
            if (!aviso) {
                aviso = document.createElement("div");
                aviso.className = "aviso-login small mt-2";
                formLogin.appendChild(aviso);
            }
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            try {
                const res = await fetch(`${API}/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: email, password })
                });
                const data = await res.json().catch(() => ({}));
                if (!res.ok) {
                    aviso.className = "aviso-login small mt-2 text-danger";
                    aviso.textContent = data.detail || "Credenciales inválidas";
                    return;
                }
                guardarLS(KEY_TOKEN, data.access_token);
                guardarLS(KEY_USER, email);
                aviso.className = "aviso-login small mt-2 text-success";
                aviso.textContent = "Sesión iniciada como " + email + ".";
                setTimeout(() => { window.location.reload(); }, 400);
            } catch (e) {
                aviso.className = "aviso-login small mt-2 text-danger";
                aviso.textContent = "No se pudo conectar con el API Gateway.";
            }
        });
    }

    const formRegistro = document.querySelector("#formRegistro form");
    if (formRegistro) {
        formRegistro.addEventListener("submit", async (ev) => {
            ev.preventDefault();
            let aviso = formRegistro.querySelector(".aviso-reg");
            if (!aviso) {
                aviso = document.createElement("div");
                aviso.className = "aviso-reg small mt-2";
                formRegistro.appendChild(aviso);
            }
            const nombre = document.getElementById("regNombre").value;
            const email = document.getElementById("regEmail").value;
            const password = document.getElementById("regPassword").value;

            try {
                const res = await fetch(`${API}/auth/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre, email, password })
                });
                const data = await res.json().catch(() => ({}));
                if (!res.ok) {
                    aviso.className = "aviso-reg small mt-2 text-danger";
                    aviso.textContent = data.detail || "No se pudo registrar la cuenta";
                    return;
                }
                guardarLS(KEY_TOKEN, data.access_token);
                guardarLS(KEY_USER, email);
                aviso.className = "aviso-reg small mt-2 text-success";
                aviso.textContent = "¡Cuenta creada y sesión iniciada como " + email + "!";
                setTimeout(() => { window.location.reload(); }, 400);
            } catch (e) {
                aviso.className = "aviso-reg small mt-2 text-danger";
                aviso.textContent = "No se pudo conectar con el API Gateway.";
            }
        });
    }

    if (new URLSearchParams(window.location.search).get("login") === "1") {
        abrirModalCuenta();
    }
}

// ===== Contacto =====
async function enviarContacto(ev, form) {
    ev.preventDefault();
    const campos = form.querySelectorAll("input, textarea");
    const datos = {
        nombre: campos[0].value,
        email: campos[1].value,
        asunto: campos[2].value,
        mensaje: campos[3].value
    };
    try {
        const res = await fetch(`${API}/orders/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });
        if (!res.ok) throw new Error(res.status);
        alert("¡Gracias por contactarnos! Te responderemos pronto.");
        form.reset();
    } catch (e) {
        alert("No se pudo enviar el mensaje. Intenta nuevamente.");
    }
}

// ===== Inicio =====
document.addEventListener("DOMContentLoaded", () => {
    prepararUIUsuario();
    renderCarrito();
    cargarCatalogo();
    iniciarCuenta();
});
