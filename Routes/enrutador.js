const express = require('express');
const router = express.Router();
const bdc = require('../Config/connection');
const Productos = require('../Models/modelsProd');
const Clientes = require('../Models/modelsClients');
const Ventas = require('../Models/modelsVenta');
const Usuario = require('../Models/modelsUsuario');
const Usuarios = require('../Models/modelsUsuario');

//Generando ruta base de la landing page
router.get('/landing', (req, res)=>{
    res.render('pages/makeup');
});

router.get('/inicio', (req, res)=>{
    res.render('pages/index', {rol:false});
});


router.get('/login', async (req, res) => {
    const autenticacion = await Usuario.findOne({Correo:req.body.Correo})
    if (autenticacion){
        res.render("pages/index", {
            "correo":autenticacion.Correo,
            "rol":autenticacion.Rol, 
            "usuario":autenticacion.Usuario
        });
    }else{
        console.log("No llegó nada")
    }
});


//Ruta de los productos
router.get("/productos", (req, res) =>{
    res.render('pages/Productos/products', {rol: false});
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
                res.redirect('/listarProd');
            }
        } );
});


//CRUD clientes

router.get("/clientesRegistros", (req, res) =>{
    res.render('pages/Clientes/clientRegister', {rol:false});
});

router.post("/registerClientes", (req, res) => {
    const newCliente = new Clientes({
        Nombre: req.body.Nombre,
        Telefono: req.body.Telefono,
        Direccion: req.body.Direccion,
        TotalComprado: req.body.TotalComprado,
        HistorialCompras: req.body.Historial, 
    });

    const newUsuario = new Usuario({
        Correo: req.body.Correo,
        Contrasena: req.body.Passw,
        Usuario: req.body.User,
        Rol: req.body.Rol,
    });

    newCliente.save();
    newUsuario.save();
    console.log('Cliente guardado');
    res.redirect('/listarClientes');
});

router.get("/listarClientesPrueba", (req, res) =>{
    /* Clientes.find({}, (err, clientes) =>{
        Usuarios.populate(clientes, { path: "Usuarios"}, (err, clientes) => {
            res.status(200).send(clientes);
        });
    }) */


    Clientes.find({}).populate('Usuarios').
    exec((err, clientes) => { 
        if (err) {
            console.error(err);
        }else{
            console.log(clientes[0].Usuarios);
        }
    });
});

router.get("/listarClientes", (req, res) =>{

    Clientes.find({}, (err, clientes) =>{
        if(err){
            console.error('Ha ocurrido un error con los clientes');
        }else{
            res.render('pages/Clientes/clientList', {datosC: clientes, rol: false});     
        }
    });
});

router.post('/deleteCliente/:_id', (req, res) =>{
    Clientes.deleteOne({_id: req.params._id}, (error) =>{
        if(error){
            res.send('Error al intentar eliminar el cliente.');
        }else{ 
            console.log('Cliente eliminado');
            res.redirect('/listarClientes');
        }
    });
});

router.get('/actualizarCliente/:_id', (req, res) => {

    Clientes.findOne({_id: req.params._id}, (err, clientes) =>{
        if(err){
            console.error('Ha ocurrido un error');
        }else{
            res.render('pages/Clientes/clientUpdate', {datosC: clientes});
        }
    });
});

router.post('/updateCliente/:_id', (req, res) => {
    Clientes.updateOne({_id: req.params._id},
        {
            $set:{
                Nombre: req.body.nombre,
                Telefono: req.body.telefono,
                Direccion: req.body.direccion,
                TotalComprado: req.body.totalComprado,
                HistorialCompras: req.body.historial
            }
        }, (err, data) => {
            if(err){
                console.error(err);
            }else{
                res.redirect('/listarClientes');
            }
        } );
});

//CRUD ventas

router.get('/listVentas', (req, res) => {
    
    Ventas.find({}, (err, ventas) => {
        if(err){
            console.error("Ha ocurrido un error");
        }else{
            res.render('pages/Ventas/listarVentas', {datosV: ventas});
        }
    });
});

router.get('/registerVenta', (req, res) => {
    res.render('pages/Ventas/registerVenta');
});

router.post('/registrarVenta', (req, res) => {
    const newVenta = new Ventas({
        ProductosV: req.body.ProductosV,
        Subtotal: req.body.Subtotal,
        FechaVenta: req.body.FechaVenta,
        Impuesto: req.body.Impuesto,
        TotalVenta: req.body.TotalVenta
    });
    
    newVenta.save();
    console.log('Venta guardada');
    res.redirect('/listVentas');
});

router.post('/deleteV/:_id', (req, res) =>{
    Ventas.deleteOne({_id: req.params._id}, (error) =>{
        if(error){
            res.send('Error al intentar eliminar la venta.');
        }else{ 
            console.log('Venta eliminada');
            res.redirect('/listVentas');
        }
    });
});

router.get('/actualizarV/:_id', (req, res) => {

    Ventas.findOne({_id: req.params._id}, (err, ventas) =>{
        if(err){
            console.error('Ha ocurrido un error');
        }else{
            res.render('pages/Ventas/ventasUpdate', {datosV: ventas});
        }
    });
});

router.post('/updateV/:_id', (req, res) => {
    Ventas.updateOne({_id: req.params._id},
        {
            $set:{
                ProductosV: req.body.productosV,
                Subtotal: req.body.subtotal,
                FechaVenta: req.body.fechaVenta,
                Impuesto: req.body.impuesto,
                TotalVenta: req.body.totalVenta
            }
        }, (err, data) => {
            if(err){
                console.error(err);
            }else{
                res.redirect('/listVentas');
            }
        } );
});


router.get("/conectar", (req, res)=>{
    bdc.mongoose;
});

module.exports = router;