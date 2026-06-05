# Ejercicios API de Productos

Este proyecto contiene una API de ejemplo en Express que utiliza MongoDB para manejar productos.

## Archivos

- `index.js`: servidor Express con rutas para listar productos, buscar por `consecutivo` y crear nuevos productos.
- `package.json`: dependencias y script de inicio.
- `productos.json`: ejemplo de datos de productos.
- `.env.example`: ejemplo de variables de entorno.

## Configuración

1. Instala dependencias:

```bash
cd ~/ejercicios-productos
npm install
```

2. Configura la conexión MongoDB en un archivo `.env` (o exporta las variables de entorno):

```env
MONGO_URI=mongodb+srv://usuario:password@clusteradsi.nzwbkjo.mongodb.net/
DB_NAME=prueba433
PORT=3000
```

3. Inicia el servidor:

```bash
npm start
```

## Endpoints

- `GET /productos` - devuelve todos los productos.
- `GET /productos/:id` - devuelve el producto con `consecutivo` igual a `id`.
- `POST /productos` - inserta un nuevo producto desde el body.

### Ejemplo `POST` en JSON

```json
{
  "consecutivo": 300,
  "nombre": "pantuflas",
  "precio": 35555
}
```
