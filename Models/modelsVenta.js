const { ObjectId } = require('mongodb');
const mongoose = require('../Config/connection');

const schemaVenta = new mongoose.Schema({
    ProductosV: {type: String, required: true },
    Subtotal: {type: Number, required: true},
    FechaVenta: {type: Date, required: true},
    Impuesto: {type: Number, required: true},
    TotalVenta: {type: Number, required: true}
});

const Ventas = mongoose.model('Ventas', schemaVenta);

module.exports = Ventas;