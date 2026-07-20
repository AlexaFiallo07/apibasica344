
        let productosOriginales = []; // Guardamos los productos originales para filtrado
        let carrito = []; // Array para guardar los productos del carrito

        const buscador = document.getElementById('buscador');
        const btnCargar = document.getElementById('btnCargar');
        const contenedorProductos = document.getElementById('contenedorProductos');
        const contadorProductos = document.getElementById('contadorProductos');
        const mensajeError = document.getElementById('mensajeError');
        const carritoItems = document.getElementById('carritoItems');
        const carritoTotal = document.getElementById('carritoTotal');

        // Función para mostrar/ocultar mensajes de error
        function mostrarError(mensaje) {
            mensajeError.innerText = mensaje;
            mensajeError.classList.remove('oculto');
        }

        function ocultarError() {
            mensajeError.classList.add('oculto');
        }

        // Función para cargar productos desde la API
        async function cargarProductos() {
            try {
                ocultarError();
                btnCargar.disabled = true;
                btnCargar.innerText = 'Cargando...';
                contenedorProductos.innerHTML = '<div class="cargando">Cargando productos...</div>';

                // Llamada a la API FakeStore
                const respuesta = await fetch('https://fakestoreapi.com/products');
                
                if (!respuesta.ok) {
                    throw new Error('Error al cargar los productos');
                }

                productosOriginales = await respuesta.json();
                contadorProductos.innerText = productosOriginales.length;
                
                // Mostrar todos los productos inicialmente
                mostrarProductos(productosOriginales);
                
                btnCargar.innerText = 'Productos Cargados ✓';
            } catch (error) {
                mostrarError(`Error: ${error.message}`);
                contenedorProductos.innerHTML = '';
            }
        }

        // Función para crear y mostrar tarjetas de productos
        function mostrarProductos(productos) {
            contenedorProductos.innerHTML = '';

            if (productos.length === 0) {
                contenedorProductos.innerHTML = '<div class="cargando">No se encontraron productos</div>';
                return;
            }

            productos.forEach((producto) => {
                // Crear la tarjeta del producto
                const tarjeta = document.createElement('div');
                tarjeta.className = 'producto-tarjeta';

                // Imagen
                const imagen = document.createElement('div');
                imagen.className = 'producto-imagen';
                const img = document.createElement('img');
                img.src = producto.image;
                img.alt = producto.title;
                imagen.appendChild(img);

                // Info
                const info = document.createElement('div');
                info.className = 'producto-info';

                const nombre = document.createElement('div');
                nombre.className = 'producto-nombre';
                nombre.innerText = producto.title;

                const precio = document.createElement('div');
                precio.className = 'producto-precio';
                precio.innerText = `$${producto.price.toFixed(2)}`;

                // Stock (simulado: usamos rating.count como stock)
                const stock = producto.rating?.count || Math.floor(Math.random() * 100) + 1;
                const stockDiv = document.createElement('div');
                stockDiv.className = stock > 0 ? 'producto-stock' : 'producto-stock sin-stock';
                stockDiv.innerText = stock > 0 ? `📦 Stock: ${stock}` : '❌ Sin Stock';

                // Botón agregar a carrito
                const acciones = document.createElement('div');
                acciones.className = 'producto-acciones';
                
                const btnAgregar = document.createElement('button');
                btnAgregar.className = 'btn-carrito';
                btnAgregar.innerText = '🛒 Agregar';
                btnAgregar.disabled = stock <= 0;

                btnAgregar.addEventListener('click', () => {
                    agregarAlCarrito(producto, precio.innerText);
                });

                // Ensamblaje de la tarjeta
                info.appendChild(nombre);
                info.appendChild(precio);
                info.appendChild(stockDiv);
                acciones.appendChild(btnAgregar);
                info.appendChild(acciones);

                tarjeta.appendChild(imagen);
                tarjeta.appendChild(info);

                contenedorProductos.appendChild(tarjeta);
            });
        }

        // Función para agregar productos al carrito
        function agregarAlCarrito(producto, precio) {
            // Verificar si el producto ya está en el carrito
            const itemExistente = carrito.find(item => item.id === producto.id);

            if (itemExistente) {
                itemExistente.cantidad++;
            } else {
                carrito.push({
                    id: producto.id,
                    nombre: producto.title,
                    precio: parseFloat(precio.replace('$', '')),
                    cantidad: 1
                });
            }

            actualizarCarrito();
        }

        // Función para actualizar la visualización del carrito
        function actualizarCarrito() {
            carritoItems.innerHTML = '';
            let total = 0;

            carrito.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'carrito-item';
                itemDiv.innerText = `${item.nombre.substring(0, 20)}... x${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}`;
                carritoItems.appendChild(itemDiv);
                total += item.precio * item.cantidad;
            });

            carritoTotal.innerText = total.toFixed(2);
        }

        // Evento del buscador para filtrar productos
        buscador.addEventListener('input', function() {
            const textoBusqueda = buscador.value.toLowerCase();
            
            const productosFiltrados = productosOriginales.filter(producto => 
                producto.title.toLowerCase().includes(textoBusqueda)
            );

            mostrarProductos(productosFiltrados);
        });

        // Evento del botón cargar
        btnCargar.addEventListener('click', cargarProductos);
        
// js/main.js
const appState = {
    productos: [],
    carrito: [],
    DOM: {
        contenedor: document.getElementById('contenedorProductos'),
        buscador: document.getElementById('buscador'),
        // ... guarda aquí el resto de tus selectores
    }
};

// Ahora, en lugar de usar variables globales, usa appState.productos