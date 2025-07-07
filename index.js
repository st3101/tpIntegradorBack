//Importamos modulos necesarios
import express, { json } from 'express';
//Importamos las variables de entorno de archivo environments.js que indicamos a exportar
import environments from './src/api/config/environments.js';
//importamos cors para permitir peticiones desde el front
import cors from 'cors';
//importamos las rutas de productos
import productosRoutes from './src/api/routes/index.js';
//Importamos la funcion loggerUrl para dejar registro de las peticiones
import { loggerUrl } from './src/api/middlewares/middlewares.js';
//Importamos el modulo de rutas de productos
import { __dirname, join } from './src/api/utils/index.js';


//Creamos una instancia de express
const app = express();
//Setiamos el puerto que vamos a usar
const PORT = environments.port;

//EJS como motor de plantillas
app.set('view engine', 'ejs');
//Indicamos la ruta de las vistas que va a ser raiz del proyecto
app.set('views', join(__dirname, 'src/views')); 



//Middleware 
//middleware para servir archivos estaticos
app.use(express.static(join(__dirname, 'src/public')));

//Middlewares Cors que permite peticiones desde el front
app.use(cors());
//Middleware para parsear el body de las peticiones a json para POST PUT y DELETE
app.use(express.json());

//Middleware para registrar las peticiones
app.use(loggerUrl)

//Rutas
app.get("/", (req, res) => {
    res.send('Hello World!');
});

app.get("/dashboard", (req, res) => {
    //Renderizamos la vista index.ejs a partir de la ruta /dashboard
    res.render('index');
}); 
//Usamos las rutas de productos
app.use("/api/productos",  productosRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http:// localhost:${PORT}`);
});