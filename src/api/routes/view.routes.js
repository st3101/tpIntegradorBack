//Importamos Router de express para crear rutas
import { Router } from "express";

import { obtenerTodosProductos, obtenerProductoID, crearProducto, actualizarProducto, eliminarProducto} from "../controllers/view.controllers.js";

const router = Router();
//Rutas de EJS
router.get("/",obtenerTodosProductos);

router.get("/consultar",obtenerProductoID); 


router.get("/crear", crearProducto);

router.get("/actualizar", actualizarProducto);

router.get("/eliminar", eliminarProducto);

//Exportamos las rutas de las vistas
export default router;