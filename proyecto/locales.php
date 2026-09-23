<!DOCTYPE html>
<html lang="es"> 
<head>
    <title>Locales - Pizzería "La Fornace"</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <style>
        .fondo-marca { background-color: #feab88; }
        .card-local { border-radius: 15px; transition: transform 0.2s; }
        .card-local:hover { transform: translateY(-5px); }
    </style>
</head>
<body>

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

                <div class="d-flex align-items-center gap-2 mt-2 mt-lg-0">
                    <button type="button" class="btn btn-outline-dark position-relative fw-bold" data-bs-toggle="offcanvas" data-bs-target="#carritoOffcanvas">
                        <i class="fa fa-shopping-cart"></i> Carrito
                        <span id="contadorCarrito" class="badge bg-danger rounded-pill ms-1">0</span>
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

    <!-- Contenido Principal -->
    <div class="container my-5">
        <div class="text-center mb-5">
            <h1 class="fw-bold">📍 Nuestros Locales & Puntos Delivery</h1>
            <p class="text-muted fs-5">¡Encuéntranos cerca de tus campus universitarios preferidos!</p>
        </div>

        <div class="row g-4">
            
            <!-- Local 1: Casona de Las Condes -->
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm border-0 card-local">
                    <div class="card-body">
                        <span class="badge bg-danger mb-2">Santiago</span>
                        <h5 class="card-title fw-bold">Sede Casona de Las Condes</h5>
                        <p class="card-text text-muted mb-1"><i class="fa fa-map-marker text-danger me-2"></i> Fernández Concha 700, Las Condes</p>
                        <p class="card-text text-muted mb-1"><i class="fa fa-clock-o text-warning me-2"></i> Lunes a Sábado: 11:30 - 22:30 hrs</p>
                        <p class="card-text text-muted"><i class="fa fa-phone text-success me-2"></i> +56 9 1234 5671</p>
                        <div class="d-grid gap-2 mt-4">
                            <a href="menu.php" class="btn btn-outline-dark fw-bold">Pedir Delivery</a>
                            <a href="https://maps.google.com/?q=Fernandez+Concha+700+Las+Condes" target="_blank" class="btn btn-sm btn-link text-decoration-none">Ver en Google Maps</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Local 2: Casona Antonio Varas / Providencia -->
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm border-0 card-local">
                    <div class="card-body">
                        <span class="badge bg-danger mb-2">Santiago</span>
                        <h5 class="card-title fw-bold">Sede Antonio Varas</h5>
                        <p class="card-text text-muted mb-1"><i class="fa fa-map-marker text-danger me-2"></i> Antonio Varas 880, Providencia</p>
                        <p class="card-text text-muted mb-1"><i class="fa fa-clock-o text-warning me-2"></i> Lunes a Sábado: 11:30 - 23:00 hrs</p>
                        <p class="card-text text-muted"><i class="fa fa-phone text-success me-2"></i> +56 9 1234 5672</p>
                        <div class="d-grid gap-2 mt-4">
                            <a href="menu.php" class="btn btn-outline-dark fw-bold">Pedir Delivery</a>
                            <a href="https://maps.google.com/?q=Antonio+Varas+880+Providencia" target="_blank" class="btn btn-sm btn-link text-decoration-none">Ver en Google Maps</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Local 3: Sede República -->
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm border-0 card-local">
                    <div class="card-body">
                        <span class="badge bg-danger mb-2">Santiago Centro</span>
                        <h5 class="card-title fw-bold">Sede República</h5>
                        <p class="card-text text-muted mb-1"><i class="fa fa-map-marker text-danger me-2"></i> Av. República 252, Santiago Centro</p>
                        <p class="card-text text-muted mb-1"><i class="fa fa-clock-o text-warning me-2"></i> Lunes a Sábado: 11:00 - 22:00 hrs</p>
                        <p class="card-text text-muted"><i class="fa fa-phone text-success me-2"></i> +56 9 1234 5673</p>
                        <div class="d-grid gap-2 mt-4">
                            <a href="menu.php" class="btn btn-outline-dark fw-bold">Pedir Delivery</a>
                            <a href="https://maps.google.com/?q=Av+Republica+252+Santiago" target="_blank" class="btn btn-sm btn-link text-decoration-none">Ver en Google Maps</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Local 4: Sede Viña del Mar -->
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm border-0 card-local">
                    <div class="card-body">
                        <span class="badge bg-primary mb-2">Viña del Mar</span>
                        <h5 class="card-title fw-bold">Sede Viña del Mar</h5>
                        <p class="card-text text-muted mb-1"><i class="fa fa-map-marker text-danger me-2"></i> Calle Quillota 980, Viña del Mar</p>
                        <p class="card-text text-muted mb-1"><i class="fa fa-clock-o text-warning me-2"></i> Lunes a Domingo: 12:00 - 23:00 hrs</p>
                        <p class="card-text text-muted"><i class="fa fa-phone text-success me-2"></i> +56 9 1234 5674</p>
                        <div class="d-grid gap-2 mt-4">
                            <a href="menu.php" class="btn btn-outline-dark fw-bold">Pedir Delivery</a>
                            <a href="https://maps.google.com/?q=Quillota+980+Vina+del+Mar" target="_blank" class="btn btn-sm btn-link text-decoration-none">Ver en Google Maps</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Local 5: Sede Concepción -->
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm border-0 card-local">
                    <div class="card-body">
                        <span class="badge bg-success mb-2">Concepción</span>
                        <h5 class="card-title fw-bold">Sede Concepción</h5>
                        <p class="card-text text-muted mb-1"><i class="fa fa-map-marker text-danger me-2"></i> Autopista Concepción - Talcahuano 7100</p>
                        <p class="card-text text-muted mb-1"><i class="fa fa-clock-o text-warning me-2"></i> Lunes a Sábado: 12:00 - 22:30 hrs</p>
                        <p class="card-text text-muted"><i class="fa fa-phone text-success me-2"></i> +56 9 1234 5675</p>
                        <div class="d-grid gap-2 mt-4">
                            <a href="menu.php" class="btn btn-outline-dark fw-bold">Pedir Delivery</a>
                            <a href="https://maps.google.com/?q=Autopista+Concepcion+Talcahuano+7100" target="_blank" class="btn btn-sm btn-link text-decoration-none">Ver en Google Maps</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

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

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="servicios.js"></script>
</body>
</html>