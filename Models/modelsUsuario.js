const { ObjectId } = require('mongodb');
const mongoose = require('../Config/connection');
const Schema = mongoose.Schema;


const schemaUsuario = new mongoose.Schema({
    Correo:{
        type:String,
        required:true
    },
    Contrasena:{
        type:String,
        required:true
    },
    Usuario:{
        type: String,
        required:true
    },
    Rol:{
        type:String,
        required:true,
        default:"Cliente"
    }
});

const Usuarios = mongoose.model('Usuarios', schemaUsuario);
module.exports = Usuarios;