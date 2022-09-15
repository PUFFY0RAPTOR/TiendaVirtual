const express = require('express');
const router = express.Router();
const bdc = require('../Config/connection');
const Productos = require('../Models/models');


//Generando ruta base de la landing page
router.get('/landing', (req, res)=>{
    res.render('pages/makeup');
});


//Ruta de los productos
router.get("/productos", (req, res) =>{
    res.render('pages/Productos/products');
});

router.get("/prodRegistros", (req, res) =>{
    res.render('pages/Productos/productsRegister');
});

router.post("/registerProd", (req, res) => {
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
});

router.get("/listarProd", (req, res) =>{

    Productos.find({}, (err, productos) =>{
        if(err){
            console.error('Ha ocurrido un error');
        }else{
            res.render('pages/Productos/productsList', {datos: productos});
        }
    });
});

router.post('/delete/:Referencia', (req, res) =>{
    Productos.deleteOne({Referencia: req.params.Referencia}, (error) =>{
        if(error){
            res.send('Error al intentar eliminar el personaje.');
        }else{ 
            console.log('Producto eliminado');
            res.redirect('/listarProd');
        }
    });
});

router.get('/actualizarProd/:_id', (req, res) => {

    Productos.findOne({_id: req.params._id}, (err, productos) =>{
        if(err){
            console.error('Ha ocurrido un error');
        }else{
            res.render('pages/Productos/productsUpdate', {datos: productos});
        }
    });
});

router.post('/updateProd/:_id', (req, res) => {
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
                res.send(data);
                //window.open('/listarProd');
                res.redirect('/listarProd');
            }
        } );
});

router.get("/conectar", (req, res)=>{
    bdc.mongoose;
});

module.exports = router;