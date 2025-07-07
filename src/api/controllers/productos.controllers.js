//Gestiona las peticiones y las respuestas de los productos de cliente

//Importamos los models
import productos from '../models/productos.models.js';


//Logica para traer todos los productos

//GET Obtener todos los productos
export const obtenerTodosProductos = async (req, res) => {
    
    try{
        //Tomamos el primer elemento del array que devuelve la consulta
        let [rows] = await productos.seleccionarTodosProductos();
    
        //repondemos con exito aunque no haya productos
        res.status(200).json({
            //playload se llama al conjunto de datos que se envian al cliente
            payload: rows,
            message: rows.length === 0 ? 'No hay productos disponibles' : 'Productos obtenidos correctamente'
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al obtener los productos'
        });
    }
}
//GET:ID Obtener un producto por id
export const obtenerProductoID = async (req, res) => {
    try{
        //Obtenemos el id del producto que queremos obtener
        //Desestructuración de objeto
        let {id} = req.params;

        //Desestructuración de array
        let [rows] = await productos.seleccionarProductoPorId(id);

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
};

//Post Crear un producto
export const crearProducto = async (req, res) => {
    try {
        //Desestructuramos el body de la peticion para obtener los datos del producto
        let {nombre, categoria, precio, cantidad, imagen} = req.body;

        //Validamos que todos los campos sean obligatorios
        if(!nombre || !categoria || !precio || !cantidad || !imagen) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            });
        }
        //Desestructuramos el array que devuelve la consulta
        let [rows] = await productos.crearNuevoProducto(nombre, categoria, precio, cantidad, imagen);

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
};

//PUT Actualizar un producto
export const actualizarProducto = async (req, res) => {
    try {
        //Nos quedamos con los datos del producto que queremos actualizar
        let {id, nombre, categoria, precio, cantidad, imagen} = req.body;

        //Validamos que todos los campos sean obligatorios
        if(!id || !nombre || !categoria || !precio || !cantidad || !imagen) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            });
        }

        //Ejecutamos la consulta sql
        let [rows] = await productos.actualizarCamposProducto(id, nombre, categoria, precio, cantidad, imagen);
        
        //Si no se actualizó ningún producto, respondemos con un error 404
        if (rows.affectedRows === 0) {
            return res.status(404).json({
                message: `No se encontró el producto con id: ${id}`
            });
        }

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
};

// DELETE eliminar producto
export const eliminarProducto = async (req, res) => {
    try {
        let {id} = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Se requiere una id para eliminar el producto"
            });
        }
        
        let [rows] = await productos.removerProducto(id);

        if (rows.affectedRows === 0) {
            return res.status(404).json({
                message: `No se encontró el producto en la base con el id: ${id}`
            });
        }

        res.status(200).json({
            message: `Producto eliminado correctamente`
        });

    } catch (error) {
        console.log("Error en DELETE /productos/:id", error);

        res.status(500).json({
            message: `Error al eliminar producto con id ${id}`,
            error: error.message
        });
    }
};