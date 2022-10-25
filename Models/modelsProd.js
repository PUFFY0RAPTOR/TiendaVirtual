const { ObjectId } = require('mongodb');
const mongoose = require('../Config/connection');

const SchemaProducto = new mongoose.Schema({
    Referencia: {
        type: String,
        required: true,
    },
    Nombre: {
        type: String,
        required: true,
    },
    Descripcion: {
        type: String,
        required: true,
        default: 'Descripción del producto',
    },
    Precio: {
        type: Number,
        default: 0,
    },
    Stock: {
        type: Number,
        required: true,
        default: 0,
    },
    Imagen: {
        type: String, 
        default: 'No tiene imagen',
    },
    Habilitado: {
        type: Boolean,
        required: true,
        default: true,
    }
});


//El primer parametro es el nombre de la colección
const Productos = mongoose.model("Productos", SchemaProducto);

module.exports = Productos


