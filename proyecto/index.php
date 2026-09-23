<!DOCTYPE html>
<html lang="es"> 
<head>
    <title>Pizzería "La Fornace" - Inicio</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- Bootstrap CSS CDN estable (5.3.3) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <style>
        .fondo-marca { background-color: #feab88; }
        .hero-home { 
            background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&auto=format&fit=crop') center/cover; 
            color: white; 
            padding: 100px 20px; 
            border-radius: 20px; 
        }
    </style>
</head>
<body class="d-flex flex-column min-vh-100">

    <!-- Navbar con Logo Agrandado -->
    <nav class="navbar navbar-expand-lg navbar-light fondo-marca py-2">
        <div class="container-fluid">
            <a class="navbar-brand me-auto me-lg-4" href="index.php">
                <img src="img/logo.webp" alt="Pizzería La Fornace" height="100" class="d-inline-block align-top">
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar"> 
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle fs-4 text-dark fw-bold" href="#" id="navbarDropdownFornace" role="button" data-bs-toggle="dropdown">
                            Fornace
                        </a>
                        <ul class="dropdown-menu shadow" aria-labelledby="navbarDropdownFornace">
                            <li><a class="dropdown-item" href="menu.php">Menús</a></li>
                            <li><a class="dropdown-item" href="locales.php">Locales</a></li>
                            <li><a class="dropdown-item" href="ID.php">Quiénes somos</a></li>
                            <li><a class="dropdown-item" href="contactos.php">Contactos</a></li>
                        </ul>
                    </li>
                </ul>

                <!-- Botones Carrito y Cuenta -->
                <div class="d-flex align-items-center gap-2 mt-2 mt-lg-0">
                    <button type="button" class="btn btn-outline-dark position-relative fw-bold" data-bs-toggle="offcanvas" data-bs-target="#carritoOffcanvas">
                        <i class="fa fa-shopping-cart"></i> Carrito
                        <span id="contadorCarrito" class="badge bg-danger rounded-pill ms-1">0</span>
                    </button>
                    <button type="button" class="btn btn-outline-danger fw-bold" data-bs-toggle="modal" data-bs-target="#myModal">
                        <i class="fa fa-user"></i> Cuenta
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Offcanvas Carrito -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="carritoOffcanvas">
        <div class="offcanvas-header bg-dark text-white">
            <h5 class="offcanvas-title">Tu Pedido</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body d-flex flex-column">
            <div id="listaCarrito" class="flex-grow-1 overflow-auto">
                <p class="text-muted text-center my-4">El carrito está vacío</p>
            </div>
            <div class="border-top pt-3 mt-2">
                <div class="d-flex justify-content-between h4">
                    <span>Total:</span>
                    <span>$<span id="totalCarrito">0</span></span>
                </div>
                <button class="btn btn-success w-100 mt-2 fw-bold" onclick="finalizarCompra()">
                    <i class="fa fa-whatsapp"></i> Finalizar Compra
                </button>
            </div>
        </div>
    </div>

    <!-- Modal de Cuenta (100% HTML y Bootstrap 5) -->
    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="myModalLabel"><i class="fa fa-user-circle me-2"></i> Mi Cuenta</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    
                    <!-- Botones para alternar entre Login y Registro -->
                    <div class="d-flex justify-content-center gap-2 mb-4">
                        <button class="btn btn-warning fw-bold w-50" type="button" data-bs-toggle="collapse" data-bs-target="#formLogin" aria-expanded="true" aria-controls="formLogin">
                            Iniciar Sesión
                        </button>
                        <button class="btn btn-outline-dark fw-bold w-50" type="button" data-bs-toggle="collapse" data-bs-target="#formRegistro" aria-expanded="false" aria-controls="formRegistro">
                            Registrarse
                        </button>
                    </div>

                    <!-- Formulario Iniciar Sesión (Visible por defecto) -->
                    <div class="collapse show" id="formLogin" data-bs-parent="#myModal">
                        <form action="index.php" method="POST">
                            <h5 class="fw-bold mb-3">Ingresar a tu Cuenta</h5>
                            <div class="mb-3">
                                <label for="loginEmail" class="form-label">Correo Electrónico</label>
                                <input type="email" class="form-control" id="loginEmail" name="email" placeholder="tu@email.com" required>
                            </div>
                            <div class="mb-3">
                                <label for="loginPassword" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="loginPassword" name="password" placeholder="••••••••" required>
                            </div>
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input" id="rememberMe">
                                <label class="form-check-label small" for="rememberMe">Recordarme en este dispositivo</label>
                            </div>
                            <button type="submit" class="btn btn-warning w-100 fw-bold">Ingresar</button>
                        </form>
                    </div>

                    <!-- Formulario Registro (Oculto hasta hacer clic) -->
                    <div class="collapse" id="formRegistro" data-bs-parent="#myModal">
                        <form action="index.php" method="POST">
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
    </div>

    <!-- Contenido Principal -->
    <main class="container my-5 flex-grow-1">
        <div class="hero-home text-center shadow">
            <h1 class="display-3 fw-bold text-warning">Pizzería "La Fornace"</h1>
            <p class="fs-4">Pizzas a la piedra con la velocidad y sabor del mejor delivery.</p>
            <a href="menu.php" class="btn btn-warning btn-lg fw-bold mt-3 px-4">Ver Menú y Pedir</a>
        </div>
    </main>

    <!-- Footer Unificado -->
    <footer class="bg-dark text-white pt-5 pb-3 mt-auto">
        <div class="container">
            <div class="row g-4 text-center text-md-start">
                <div class="col-md-4">
                    <h5 class="text-uppercase fw-bold text-warning mb-3">Pizzería "La Fornace"</h5>
                    <p class="small text-secondary">Las mejores pizzas a la piedra preparadas con ingredientes frescos y horneadas a la perfección. Servicio directo a tu campus universitario o domicilio.</p>
                </div>
                <div class="col-md-4">
                    <h5 class="text-uppercase fw-bold text-warning mb-3">Navegación</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="menu.php" class="text-secondary text-decoration-none"><i class="fa fa-angle-right me-1"></i> Menús & Promos</a></li>
                        <li class="mb-2"><a href="locales.php" class="text-secondary text-decoration-none"><i class="fa fa-angle-right me-1"></i> Nuestros Locales</a></li>
                        <li class="mb-2"><a href="ID.php" class="text-secondary text-decoration-none"><i class="fa fa-angle-right me-1"></i> Quiénes Somos</a></li>
                        <li class="mb-2"><a href="contactos.php" class="text-secondary text-decoration-none"><i class="fa fa-angle-right me-1"></i> Contacto & Redes</a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h5 class="text-uppercase fw-bold text-warning mb-3">Atención & Delivery</h5>
                    <p class="small text-secondary mb-1"><i class="fa fa-map-marker text-danger me-2"></i> Cobertura en Sedes UNAB</p>
                    <p class="small text-secondary mb-1"><i class="fa fa-envelope text-warning me-2"></i> contacto@lafornace.cl</p>
                    <p class="small text-secondary"><i class="fa fa-phone text-success me-2"></i> +56 9 8765 4321</p>
                </div>
            </div>
            <hr class="border-secondary my-4">
            <div class="text-center">
                <p class="small text-secondary mb-0">© 2026 Pizzería "La Fornace" - Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <!-- Scripts CDN de Bootstrap y JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="servicios.js"></script>
</body>
</html>