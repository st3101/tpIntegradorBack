//Logica para trabajar con rutas de archivos y rutas

//Convierte una url de archivo a una ruta de archivo del sistema operativo
import {fileURLToPath} from 'node:url';

//Devuelve el directorio padre de una ruta
//Une partes de una ruta
import {dirname, join} from 'node:path';

const __filename = fileURLToPath(import.meta.url);
//Import.meta.url: propriedad que contiene la URL del módulo actual ejem (file: /// ruta/al/archivo.js)
//fileURLToPath: convierte una URL de archivo en una ruta del sistema operativo (/ruta/al/archivo.js)

const __dirname = join(dirname(__filename),"../../../"); 
//dirname: devuelve el directorio del archivo acutal
//join (..., "../") Retrocerder 3 niveles de util a api a src IntegradorBack

export{
    __dirname,
    join
}
