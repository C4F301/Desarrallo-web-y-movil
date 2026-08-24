
<!-- Para transformar al html 5 -->
<!DOCTYPE html>
<html lang="es"> 
    <head>
        <title>Pagina Principal</title>
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
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
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
                <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#myModal">Cuenta</button>
            </div>
        </nav>

        <!-- Container -->
        <div class="container p-5 bg-warning d-flex justify-content-center mt-1">
            <p class="h2">Salon principal</p>
        </div>

        <div class="container p-5 mb-1 mt-1 bg-info">
            <div class="row justify-content-center">
                <div class="col-sm-4 text-center">
                    <a href="biomas.php" class="h4">Biomas</a>
                </div>
                <div class="col-sm-4 text-center">
                    <a href="bestiario.php" class="h4">Bestiario</a>  
                </div>
            </div>
        </div>


        <div class="container p-5 mb-1 mt-1 bg-info">
            <div class="row justify-content-center">
                <div class="col-sm-4 text-center">
                    <a href="armas.php" class="h4">Armas</a>       
                </div>
                <div class="col-sm-4 text-center">
                    <a href="agricultura.php" class="h4">Agricultura</a>             
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="container-fluid bg-dark py-2">
            <div class="row">
                <div class="col-4"></div>
                <div class="col-4 d-flex justify-content-center" style="color:white"><strong>valhwiki@2026 esta es una pagina de tarea</strong></div>
                <div class="col-4"></div>
            </div>
        </div>

         <!-- Modal  ventana emerjentes -->
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