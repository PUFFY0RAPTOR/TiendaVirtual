const { ObjectId } = require('mongodb');
const mongoose = require('../Config/connection');
const Usuarios = require('./modelsUsuario');
const Schema = mongoose.Schema;

const schemaCliente = new mongoose.Schema({
    Nombre:{ type: String, required: true },
    Telefono:{ type: Number, required: true, default: 0 },
    Direccion:{ type: String, required: true },
    TotalComprado:{ type: Number, required: true },
    HistorialCompras:{ type: String, required: true },
    Usuarios: [{ type: Schema.Types.ObjectId, ref: 'Usuarios'}]
});

//El primer parametro es el nombre de la colección
const Clientes = mongoose.model("Clientes", schemaCliente)

module.exports = Clientes

