<!DOCTYPE html>
<html lang="es"> 
<head>
    <title>Contactos - Pizzería "La Fornace"</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <style>
        .fondo-marca { background-color: #feab88; }
        .btn-social { width: 50px; height: 50px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 20px; transition: transform 0.2s; }
        .btn-social:hover { transform: scale(1.1); }
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
            <h1 class="fw-bold">📞 Ponte en Contacto con Nosotros</h1>
            <p class="text-muted fs-5">¿Tienes dudas, sugerencias o deseas hacer un pedido especial para eventos?</p>
        </div>

        <div class="row g-5">
            <div class="col-lg-7">
                <div class="card border-0 shadow-sm p-4">
                    <h4 class="fw-bold mb-4">Enviarnos un Mensaje</h4>
                    <form onsubmit="event.preventDefault(); alert('¡Gracias por contactarnos! Te responderemos pronto.'); this.reset();">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label">Nombre Completo</label>
                                <input type="text" class="form-control" required placeholder="Ej: Juan Pérez">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Correo Electrónico</label>
                                <input type="email" class="form-control" required placeholder="ejemplo@correo.com">
                            </div>
                            <div class="col-12">
                                <label class="form-label">Asunto</label>
                                <input type="text" class="form-control" required placeholder="Consulta sobre delivery, menú, etc.">
                            </div>
                            <div class="col-12">
                                <label class="form-label">Mensaje</label>
                                <textarea class="form-control" rows="5" required placeholder="Escribe tu mensaje aquí..."></textarea>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-warning fw-bold px-4">Enviar Mensaje</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="col-lg-5">
                <div class="bg-dark text-white p-4 rounded-4 shadow h-100 d-flex flex-column justify-content-between">
                    <div>
                        <h4 class="fw-bold text-warning mb-4">Información de Contacto</h4>
                        <p class="fs-5 mb-3"><i class="fa fa-phone text-warning me-3"></i> Call Center Delivery: <br><strong class="ms-4">+56 9 8765 4321</strong></p>
                        <p class="fs-5 mb-3"><i class="fa fa-envelope text-warning me-3"></i> Email: <br><strong class="ms-4">contacto@lafornace.cl</strong></p>
                        <p class="fs-5 mb-3"><i class="fa fa-clock-o text-warning me-3"></i> Horario Delivery: <br><strong class="ms-4">Lun - Dom: 11:30 a 23:00 hrs</strong></p>
                    </div>

                    <div class="mt-4 pt-4 border-top border-secondary">
                        <h5 class="fw-bold text-warning mb-3">¡Síguenos en nuestras Redes!</h5>
                        <div class="d-flex gap-3">
                            <a href="https://instagram.com" target="_blank" class="btn btn-danger btn-social" title="Instagram">
                                <i class="fa fa-instagram"></i>
                            </a>
                            <a href="https://facebook.com" target="_blank" class="btn btn-primary btn-social" title="Facebook">
                                <i class="fa fa-facebook"></i>
                            </a>
                            <a href="https://tiktok.com" target="_blank" class="btn btn-secondary btn-social" title="TikTok">
                                <i class="fa fa-music"></i>
                            </a>
                            <a href="https://wa.me/56987654321" target="_blank" class="btn btn-success btn-social" title="WhatsApp">
                                <i class="fa fa-whatsapp"></i>
                            </a>
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