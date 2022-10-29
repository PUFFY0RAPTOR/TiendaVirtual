const Productos = require('../Models/modelsProd');

function listarProductos(req, res){
    Productos.find({}, (err, productos)=>{
        if(err){
            console.error('Ha ocurrido un error');
        }else{
            let cooki = req.cookies;
            res.render('pages/Productos/products', {produc: productos, datos: cooki});
        }
    });
};


module.exports = {listarProductos};