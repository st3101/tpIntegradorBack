//Importamos modulos necesarios msql en modo promesas, para usar async/await
import mysql from 'mysql2/promise';
import environments from '../config/environments.js';

//seteamos los parametros de conexion a la base de datos
const {database} = environments;

//Creamos una conexion a la base de datos usando un pool de conexiones
const connection = mysql.createPool({
    host: database.host,
    user: database.user,
    database: database.name,
    password: database.password
});

export default connection;