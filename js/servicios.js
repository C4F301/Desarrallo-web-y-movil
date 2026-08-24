// ===== los productos =====
            const respuestaProductos = {

                "status": 200,
                "message": "Productos obtenidos correctamente",
                "data": [

                    {
                        id: 1,
                        nombre: "Polera Filo de Hacha",
                        precio: 12990,
                        imagen: "img/hachas.webp",
                        descripcion: "Estampado inspirado en las armas del bioma pantano."
                    },

                    {
                        id: 2,
                        nombre: "Gorro Escama de Dragón",
                        precio: 8990,
                        imagen: "img/dragon.webp",
                        descripcion: "Gorro de lana con diseño del dragón guardián."
                    },

                    {
                        id: 3,
                        nombre: "Poster Bosque Oscuro",
                        precio: 5990,
                        imagen: "img/bosque.webp",
                        descripcion: "Poster decorativo del bioma más temido de ValhWiki."
                    },

                    {
                        id: 4,
                        nombre: "Polerón Praderas",
                        precio: 15990,
                        imagen: "img/praderas.webp",
                        descripcion: "Polerón con capucha, ideal para explorar los prados."
                    },

                    {
                        id: 5,
                        nombre: "Llavero Pico de Metal Negro",
                        precio: 3990,
                        imagen: "img/BlackMetalPickaxe.webp",
                        descripcion: "Réplica en miniatura del pico legendario."
                    },

                    {
                        id: 6,
                        nombre: "Bandana Cazador de Venados",
                        precio: 6490,
                        imagen: "img/venado.webp",
                        descripcion: "Bandana estampada, para los amantes de la caza."
                    }
                ]
            };

            // CARRITO
            let carrito = [];

            // GENERA BLOQUE
            const contenedor_Productos = document.getElementById("contenedorProductos");

            respuestaProductos.data.forEach(producto => {

                // COLUMNA 
                const columna = document.createElement("div");
                columna.className = "col-12 col-md col-lg-4";

                // BLOQUE 
                const bloque = document.createElement("div");
                bloque.className = "card h-100 shadow";

                bloque.innerHTML = `
                
                    <img 
                        src ="${producto.imagen}"
                        class="card-img-top p-3"
                        alt="${producto.nombre}"
                        style="height: 250px; object-fit: contain;"
                    >

                    <div class="card-body d-flex flex column">

                        <h5 class="card-title">
                            ${producto.nombre}
                        </h5>

                        <p class="card-text">
                            ${producto.descripcion}
                        </p>

                        <p class="h4 text-success mt-auto">
                            $${producto.precio.toLocaleString("es-CL")}
                        </p>

                        <button
                            class="btn btn-warning mt-2"
                            onclick="Agregar_Al_Carrito(${producto.id})"
                        >

                            <i class="fa fa-shopping-cart"></i>
                            agregar al carrito
                        </button>
                
                    </div>

                `;

                // Meter bloque dentro de la columna
                columna.appendChild(bloque);
                // Metemos la columna al contenerdor 
                contenedor_Productos.appendChild(columna);

            });

            // AGREGAR PRODUCTOS AL CARRITO 

            // function para calculo
            function agregarAlCarrito(id) 
            {

                // Busca el producto por el id 
                // === para realizar una comparacion de igualdad estricta
                // => ARROW FUNCTIONS funciones con flechas 
                const producto = respuestaProductos.data.find(producto => producto.id === id);

                // BUSCAR SI YA SE TIENE EL PRODUCTO EN EL CARRITO 
                const productoExiste = carrito.find(producto => producto.id === id);

                if (productoExiste) 
                {

                    // SI EL PRPDIUCTO YA EXISTE AUMENTE EN LA CANTIDAD
                    productoExiste.cantidad++;

                }
                else 
                {

                    // SO NO EXISTE ENB EL CARRITO SE AGREGA
                    // .push es para agergar uno o mas al elemento final
                    carrito.push
                    ({

                        // ... spread operator ,,, 
                        // toma las propiedades del producto y las copia dentro del nuevo obj
                        ...producto,

                        cantidad: 1

                    });

                }

                // ACTUALIZAR CARRITO
                actualizarCarrito();

            }

            function actualizarCarrito()
            {

                const listaCarrito = document.getElementById("listaCarrito");
                const contadorCarrito = document.getElementById("contadorCarrito");
                const totalCarrito = document.getElementById("totalCarrito");

                // VACIAR EL CARRITO 
                // CAMBIAR CONTENIDO DEL HTML
                listaCarrito.innerHTML = "";

                // CARRITO VACIO
                // .length PARA SABER LA CANTIDAD DE ELEMENTOS O CARACTERES O PARAAMETROS QUE SE TIENE
                if (carrito.length === 0) 
                {

                    // <p> texto en pantalla
                    listaCarrito.innerHTML = `
                    
                    <p class = "text-muted">
                        El carrito esta vacio
                    </p>
                    `;

                    contadorCarrito.textContent = 0;
                    totalCarrito.textContent = 0;

                }

                let total = 0;
                let cantidadTotal = 0;

                // LEER TODOS LOS PROCUTOS DEL CARRITO "RECORRER"
                carrito.forEach(producto => 
                {

                    const subTotal = producto.precio * producto.cantidad;
                    total += subTotal;
                    cantidadTotal += producto.cantidad;

                    // <h6> titulo enano 
                    // MOSTRASTRAR LOS PRODUCTOR 
                    listaCarrito.innerHTML += `
                    
                    <div class="card mb-2">
                        <div class"card-body">

                            <h6>

                                ${producto.nombre}

                            </h6>

                            <p class="mb-1">
                                precio:
                                $${producto.precio.toLocaleString("es-CL")}
                            </p>

                            <p class="mb-1">
                                cantidad:
                                ${producto.cantidad}
                            </p>

                            <strong>
                                subtotal:
                                $${subTotal.toLocaleString("es-CL")}
                            </strong>
                        </div>
                    </div>

                    `;

                });

                contadorCarrito.textContent = cantidadTotal;
                totalCarrito.textContent = total.toLocaleString("es-Cl");

            }
