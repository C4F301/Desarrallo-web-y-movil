
<!-- Para transformar al html 5 -->
<!DOCTYPE html>
<html lang="es"> 
    <head>
        <title>Pagina de agricultura</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Permite medir la escala y permite que el diseño se adapte  -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"> <!-- Para incluir diseño que trae el boostrap -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script> <!-- Todo los eventos -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body>
    
        <!-- Navar -->
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
            <div class="container-fluid">
                <a class="navbar-brand ms-2" href="index.php">
                    <img src="img/logo.png" alt="Logo" height="50" class="d-inline-block align-top me-2">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar"> 
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar"> <!-- Para que se pueda colapsar el menu -->
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Empresa</a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Nuestro Equipo</a></li>
                                <li><a class="dropdown-item" href="#">Mision</a></li>
                            </ul>
                        </li>                        
                        <li class="nav-item">
                            <a class="nav-link" href="biomas.php">Biomas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="bestiario.php">Bestiario</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="armas.php">Armas</a>
                        </li>                          
                        <li class="nav-item">
                            <a class="nav-link" href="agricultura.php">Agricultura</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="servicios.php">Servicios</a>
                        </li>
                    </ul>
                </div>
                <!-- boton para modal -->
                <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#myModal">Cuenta</button>
            </div>
        </nav>

        <!-- Container para carrusel -->
        <div class="container-fluid bg-light">
            <div class="container">
                <div id="demo" class="carousel slide" data-bs-ride="carousel">
                    <!-- Indicators/dots -->
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                    </div>

                    <!-- The slideshow/carousel -->
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="img/venado.webp" alt="Venado" class="d-block w-30 mx-auto">
                            <div class="text-center bg-secondary text-black py-3">
                                <h5>Eikthyr</h5>
                                <p>Eikthyr es el primer jefe . Tiene la apariencia de un ciervo anormalmente grande con cadenas de hierro enrolladas alrededor de sus astas rojas electrificadas.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="img/arbol.webp" alt="Árbol" class="d-block w-30 mx-auto">
                            <div class="text-center bg-secondary text-black py-3">
                                <h5>El Anciano</h5>
                                <p>El Anciano es el segundo jefe . Tiene la apariencia de una imponente entidad humanoide con forma de árbol, con múltiples ramas delgadas que brotan de su cuerpo esbelto y cubierto de corteza.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="img/dragon.webp" alt="Dragon" class="d-block w-30 mx-auto">
                            <div class="text-center bg-secondary text-black py-3">
                                <h5>Mother</h5>
                                <p>Mother es la cuarta jefa . Se presenta como un enorme dragón de hielo con escamas negras, una melena de pelo blanco y alas desgarradas. Según numerosas runas , es la madre de todos los dragones .</p>
                            </div>
                        </div>
                    </div>

                    <!-- Left and right controls/icons -->
                    <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="container-fluid bg-dark">
            <div class="row">
                <div class="col-4"></div>
                <div class="col-4 d-flex justify-content-center" style="color:white"><strong>valhwiki@2026</strong></div>
                <div class="col-4"></div>
            </div>
        </div>

         <!-- Modal -->
        <div class="modal fade" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Cuenta</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <form action="empresa.php">
                            <div class="mb-2 mt-2">
                                <label for="email" class="form-label">Email:</label>
                                <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
                            </div>
                            <div class="mb-2">
                                <label for="pwd" class="form-label">Password:</label>
                                <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd">
                            </div>
                            <div class="form-check mb-2">
                                <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" name="remember"> Remember me
                                </label>
                            </div>
                            <button type="submit" class="btn btn-primary">Login<i class="fa fa-check-circle-o"></i></button></button>
                        </form>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>