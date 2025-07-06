//Middleware para logear y analizar las peticiones
const loggerUrl = (req, res, next) => {
    //Logueamos la fecha y hora de la peticion, el metodo y la url
    console.log(`[${new Date().toLocaleString()}]${req.method} ${req.url}`);
    //Continuamos con la siguiente peticion
    next();
};

//Middleware de ruta donde validamos el id
const validateId = (req, res, next) => {
    
    const id = req.params.id;
    //Validamos que el id sea un numero
    if(!id || isNaN(id)) {
        return res.status(400).json({
            message: 'El id debe ser un numero'
        });
    }

    //Convertimos el id a numero
    req.id = parseInt(id, 10);

    next();
};

//Exportamos los middlewares
export { 
    loggerUrl, 
    validateId 
};