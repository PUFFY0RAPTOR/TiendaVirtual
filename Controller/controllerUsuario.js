const Usuarios = require('../Models/modelsUsuario');

function registerUsuarios(req, res){
    const newUsuario = new Usuario({
        Correo: req.body.Correo, 
        Contrasena: req.body.Passw, 
        Usuario: req.body.User, 
        Rol: req.body.Rol, 
    })  

    newUsuario.save();
    console.log('Usuario guardado correctamente');
    res.redirect('/loginForm');
};

module.exports = registerUsuarios;