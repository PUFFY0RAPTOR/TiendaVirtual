const Productos = require('../Models/modelsProd');

function obtenerProductos(req, res){
    Productos.find({}, (err, productos)=>{
        if(err){
            console.error('Ha ocurrido un error');
        }else{
            let cooki = req.cookies;
            res.render('pages/Productos/products', {produc: productos, datos: cooki});
        }
    });
};

function formularioRegistroProd(req, res){
    res.render('pages/Productos/productsRegister', req.cookies);
};

function registroProd(req, res){
    const newProducts = new Productos({
        Referencia: req.body.Referencia,
        Nombre: req.body.Nombre,
        Descripcion: req.body.Descripcion,
        Precio: req.body.Precio,
        Stock: req.body.Stock,
        Imagen: req.body.Imagen,
        Habilitado: req.body.Habilitado
    });

    newProducts.save();
    console.log('Producto guardado');
    res.redirect('/listarProd');
};

function listarProductos(req, res){
    Productos.find({}, (err, productos)=>{
        if(err){
            console.error('Ha ocurrido un error');
        }else{
            let cooki = req.cookies;
            res.render('pages/Productos/productsList', {produc: productos, datos: cooki});
        }
    });
};

function eliminarProducto(req, res){
    Productos.deleteOne({Referencia: req.params.Referencia}, (error) =>{
        if(error){
            res.send('Error al intentar eliminar el personaje.');
        }else{ 
            console.log('Producto eliminado');
            res.redirect('/listarProd');
        }
    });
};

function formActualizarProducto(res, res){
    Productos.findOne({_id: req.params._id}, (err, productos) =>{
        if(err){
            console.error('Ha ocurrido un error');
        }else{
            res.render('pages/Productos/productsUpdate', {datos: productos});
        }
    });
};

function actualizarProductos(res, req){
    Productos.updateOne({_id: req.params._id},
        {
            $set:{
                Referencia: req.body.referencia, 
                Nombre: req.body.nombre,                
                Descripcion: req.body.descripcion, 
                Precio: req.body.precio, 
                Stock: req.body.stock, 
                Imagen: req.body.imagen, 
                Habilitado: req.body.habilitado,
            }
        }, (err, data) => {
            if(err){
                console.error(err);
            }else{
                res.redirect('/listarProd');
            }
        } );
};



module.exports = { obtenerProductos, formularioRegistroProd, registroProd, listarProductos,
                    eliminarProducto, formActualizarProducto, actualizarProductos };