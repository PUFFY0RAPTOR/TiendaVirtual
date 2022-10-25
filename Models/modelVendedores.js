const { ObjectId } = require('mongodb');
const mongoose = require('../Config/connection');
//const Productos = require('./models');

const SchemaVendedores = new mongoose.Schema({
    Nombre: {
        type: String,
        required: true,
    },
    Documento: {
        type: Number,
        required: true,
    },
    
});

const Vendedores = mongoose.model("Vendedores", SchemaVendedores);


module.exports = Vendedores;