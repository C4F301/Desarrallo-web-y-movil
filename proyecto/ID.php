<!DOCTYPE html>
<html lang="es"> 
<head>
    <title>Quiénes Somos - Pizzería "La Fornace"</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <style>
        .fondo-marca { background-color: #feab88; }
        .hero-id { background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&auto=format&fit=crop') center/cover; color: white; border-radius: 15px; }
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
        
        <div class="hero-id p-5 text-center shadow mb-5">
            <h1 class="display-4 fw-bold">Tradición e Innovación a la Piedra</h1>
            <p class="lead">El secreto de nuestra masa madre horneada en piedra volcánica.</p>
        </div>

        <div class="row g-5 align-items-center mb-5">
            <div class="col-md-6">
                <h2 class="fw-bold text-danger mb-3">Nuestra Historia</h2>
                <p class="text-muted fs-5">
                    <strong>Pizzería "La Fornace"</strong> nació con el objetivo de llevar el auténtico sabor italiano directo a la puerta de la comunidad universitaria. Inspirados en los métodos tradicionales de horneado a la piedra, combinamos recetas clásicas con la rapidez que requiere el servicio moderno de delivery.
                </p>
                <p class="text-muted fs-5">
                    Utilizamos ingredientes frescos de primera calidad, masa fermentada por 48 horas y un proceso de horneado rápido a altas temperaturas que otorga a nuestras bordes esa textura crocante y esponjosa única.
                </p>
            </div>
            <div class="col-md-6">
                <img src="https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=600&auto=format&fit=crop" class="img-fluid rounded-4 shadow" alt="Horno de pizza a la piedra">
            </div>
        </div>

        <div class="row g-4 text-center">
            <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm p-3">
                    <div class="card-body">
                        <i class="fa fa-fire fa-3x text-warning mb-3"></i>
                        <h4 class="card-title fw-bold">Cocción a la Piedra</h4>
                        <p class="card-text text-muted">Masa crujiente horneada sobre piedra natural a más de 400°C para mantener el sabor artesanal.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm p-3">
                    <div class="card-body">
                        <i class="fa fa-motorcycle fa-3x text-danger mb-3"></i>
                        <h4 class="card-title fw-bold">Delivery Express</h4>
                        <p class="card-text text-muted">Especializados en entregar tu pedido rápido, caliente y listo para disfrutar en campus o casa.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm p-3">
                    <div class="card-body">
                        <i class="fa fa-leaf fa-3x text-success mb-3"></i>
                        <h4 class="card-title fw-bold">Calidad Fresca</h4>
                        <p class="card-text text-muted">Selección diaria de vegetales, quesos 100% mozzarella y salsas artesanales sin conservantes.</p>
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