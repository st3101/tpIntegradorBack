import {Router} from "express"
//Importamos el middleware validateId para validar el id de los productos
import { validateId } from "../middlewares/middlewares.js";
//Importamos la funcion getAllProductos del controlador de productos
import { eliminarProducto, obtenerTodosProductos, obtenerProductoID, actualizarProducto, crearProducto} from "../controllers/productos.controllers.js";

//Creamos una instancia del router de express
const router = Router();

//Peticiones que llaman a los controladores de productos

//GET Obtener todos los productos
router.get("/", obtenerTodosProductos);

//GET:ID Obtener un producto por id
router.get("/:id", validateId, obtenerProductoID);

//Post Crear un producto
router.post("/", crearProducto);

//PUT Actualizar un producto
router.put("/", actualizarProducto);

// DELETE eliminar producto
router.delete("/:id", eliminarProducto);

// Exportamos el router para poder usarlo en index.js
export default router;