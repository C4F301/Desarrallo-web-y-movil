<!-- front de la pagina de inicio -->

<!DOCTYPE html>
<html lang="es"> 
    <head>
        <title>Pagina Principal</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Permite medir la escala y permite que el diseño se adapte  -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"> <!-- Para incluir diseño que trae el boostrap -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script> <!-- Todo los eventos -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <!-- Colores personalizados -->
        <style>
            .color-marca {
                color: #feab88; /* para texto/logo */
            }
            .fondo-marca {
                background-color: #feab88; /* para la barra */
            }
        </style>
    </head>
    <body>
    
        <!-- Navar -->
        <nav class="navbar navbar-expand-sm navbar-light position-relative py-4 fondo-marca">
            <div class="container-fluid">
                <a class="navbar-brand position-absolute top-50 start-50 translate-middle" href="index.php">
                    <img src="img/logo.webp" alt="Logo" height="100" class="d-inline-block align-top">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar"> 
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle fs-4" href="#" role="button" data-bs-toggle="dropdown">Fornace</a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="menu.php">Menus</a>
                                </li>
                                <li><a class="dropdown-item" href="locales.php">Locales</a>
                                </li>
                                <li><a class="dropdown-item" href="ID.php">Quienes somos</a>
                                </li>
                                <li><a class="dropdown-item" href="contactos.php">Contactos</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <!-- Botones a la derecha: Carrito y Cuenta -->
                <div class="d-flex align-items-center gap-2">
                    <button type="button" class="btn btn-outline-dark" data-bs-toggle="offcanvas" data-bs-target="#carritoOffcanvas">
                        <i class="fa fa-shopping-cart"></i> Carrito
                    </button>
                    <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#myModal">Cuenta</button>
                </div>
            </div>
        </nav>