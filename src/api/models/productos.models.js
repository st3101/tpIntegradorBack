//Impotamos la conexion a la base de datos
import connection from '../database/db.js';

//Consultas a la base de datos

//Selecciona todos los productos de la base de datos
const seleccionarTodosProductos = async () => {

    let sql = 'SELECT * FROM productos'; 
    return await connection.query(sql);
}

//Selecciona un producto por id
const seleccionarProductoPorId = async (id) => {

    let sql = 'SELECT * FROM productos WHERE id = ?';

    //Consulta sql segura
    return await connection.query(sql, [id]);
}

//Crea un nuevo producto en la base de datos
const crearNuevoProducto = async (nombre, categoria, precio, cantidad, imagen) => {
    //Creamos la consulta sql para insertar un nuevo producto
    let sql = 'INSERT INTO productos (nombre, categoria, precio, cantidad, imagen) VALUES (?, ?, ?, ?, ?)';
    //Ejecutamos la consulta sql segura contra inyeccion sql
    return await connection.query(sql, [nombre, categoria, precio, cantidad, imagen]);
}

const actualizarCamposProducto = async (id, nombre, categoria, precio, cantidad, imagen) => {
    //Creamos la consulta sql para actualizar el producto
    let sql = 'UPDATE productos SET nombre = ?, categoria = ?, precio = ?, cantidad = ?, imagen = ? WHERE id = ?';

    //Ejecutamos la consulta sql segura contra inyeccion sql
    return await connection.query(sql, [nombre, categoria, precio, cantidad, imagen, id]);
}

const removerProducto = async (id) => {
    //Creamos la consulta sql para eliminar un producto
    let sql = "DELETE FROM productos WHERE id = ?";

    //Ejecutamos la consulta sql segura contra inyeccion sql
    return await connection.query(sql, [id]);
}

//Exportamos las funciones para que puedan ser usadas en otros archivos
export default {
    seleccionarTodosProductos,
    seleccionarProductoPorId,
    crearNuevoProducto,
    actualizarCamposProducto,
    removerProducto
}

