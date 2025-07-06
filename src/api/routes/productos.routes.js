import {Router} from "express"
//Importamos la conexion a la base de datos
//import connection from './src/api/database/db.js';
import connection from '../database/db.js';
import { validateId } from "../middlewares/middlewares.js";
const router = Router();

//GET Obtener todos los productos
router.get("/", async (req, res) => {
    
    try{
        let sql = 'SELECT * FROM productos'; 

        //Tomamos el primer elemento del array que devuelve la consulta
        let [productos] = await connection.query(sql);
    
        //repondemos con exito aunque no haya productos
        res.status(200).json({
            //playload se llama al conjunto de datos que se envian al cliente
            payload: productos,
            meessage: productos.length === 0 ? 'No hay productos disponibles' : 'Productos obtenidos correctamente'
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al obtener los productos'
        });
    }

});

//
//GET:ID Obetener un producto por id
router.get("/:id", validateId, async (req, res) => {
    try{
        //Obtenemos el id del producto que queremos obtener
        //Desestructuración de objeto
        let {id} = req.params;

        //Consulta sql con problema de inyeccion sql
        //let sql = 'SELECT * FROM productos WHERE id = ?';

        //Consulta sql segura
        //Desestructuración de array
        let [rows] = await connection.query('SELECT * FROM productos WHERE id = ?', [id]);

        //Si no hay productos con ese id, respondemos con un error 404
        if(rows.length === 0) {
            return res.status(404).json({
                message: `Producto no encontrado en el id: ${id}`
            });
        }

        res.status(200).json({
            payload: rows,
        });
    }catch (error) {
        //Si hay un error en la consulta, respondemos con un error 500 (error interno del servidor)
        res.status(500).json({
            message: 'Error al obtener el producto'
        });
    }
});

//Post Crear un producto
router.post("/", async (req, res) => {
    try {
        let {nombre, categoria, precio, cantidad, imagen} = req.body;

        if(!nombre || !categoria || !precio || !cantidad || !imagen) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            });
        }

        let sql = 'INSERT INTO productos (nombre, categoria, precio, cantidad, imagen) VALUES (?, ?, ?, ?, ?)';
        let [rows] = await connection.query(sql, [nombre, categoria, precio, cantidad, imagen]);

        res.status(201).json({
            message: 'Producto creado correctamente',
            //devolvemos el id del producto creado
            payload: {
                id: rows.insertId,
            }
        });
    } catch (error) {
        console.error(error);
        //Si hay un error en la consulta, respondemos con un error 500 (error interno del servidor)
        res.status(500).json({
            message: 'Error al crear el producto',
            error: error.message
        });
    }   
});

//PUT Actualizar un producto
router.put("/", async (req, res) => {
    try {
        //Nos quedamos con los datos del producto que queremos actualizar
        let {id, nombre, categoria, precio, cantidad, imagen} = req.body;

        //Validamos que todos los campos sean obligatorios
        if(!id || !nombre || !categoria || !precio || !cantidad || !imagen) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            });
        }

        //Creamos la consulta sql para actualizar el producto
        let sql = 'UPDATE productos SET nombre = ?, categoria = ?, precio = ?, cantidad = ?, imagen = ? WHERE id = ?';
        //Ejecutamos la consulta sql
        let [resultado] = await connection.query(sql, [nombre, categoria, precio, cantidad, imagen, id]);
        
        res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    
    } catch (error) {
        console.log("Error al actualizar el producto", error)

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message 
        })
    } 
});

// DELETE eliminar producto
router.delete("/:id", async (req, res) => {
    try {
        let {id} = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Se requiere una id para eliminar el producto"
            });
        }

        let sql = "DELETE FROM productos WHERE id = ?";
        let [resultado] = await connection.query(sql, [id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                message: `No se encontró el producto en la base con el id: ${id}`
            });
        }

        res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });


    } catch (error) {
        console.log("Error en DELETE /productos/:id", error);

        res.status(500).json({
            message: `Error al eliminar producto con id ${id}`,
            error: error.message
        });
    }
});

// Exportamos el router para poder usarlo en index.js
export default router;