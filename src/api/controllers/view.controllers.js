//Importamos el modelo de productos (las consultas a la base de datos)
import productos from "../models/productos.models.js";

export const obtenerTodosProductos = async (req, res) => {

    try {

        //Usamos la funciones que previamente creamos
        const rows = await productos.seleccionarTodosProductos();

        //Renderizamos la vista index.ejs a partir de la ruta /dashboard
        res.render('index', {
            title: "Inicio Dashboard",
            about: "Listado de productos",
            //Le pasamos solo los productos
            productos: rows[0]
        });
    } catch (error) {
        console.error("Error al renderizar la vista:", error);
        res.status(500).json({
            error: "Error al renderizar la vista"
        });
    }
}

export const obtenerProductoID = async (req, res) => {
    
        res.render('consultar', {
            title: "Consultar Producto",
            about: "Consultar producto por ID",
            action: "Consultar"
        });
}

export const crearProducto = async (req, res) => {

    
    res.render('crear', {
        title: "Crear Producto",
        about: "Crear nuevo producto",
        action: "Crear"
    });
};

export const actualizarProducto = async (req, res) => {
    res.render('actualizar', {
        title: "Actualizar Producto",
        about: "Actualizar producto por ID",
        action: "Buscar"
    });
}

export const eliminarProducto = async (req, res) => {
    res.render('eliminar', {
        title: "Eliminar Producto",
        about: "Eliminar producto por ID",
        action: "Eliminar"
    });
}