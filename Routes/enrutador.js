const express = require('express');
const router = express.Router();
const bdc = require('../Config/connection');
const Productos = require('../Models/modelsProd');
const Clientes = require('../Models/modelsClients');
const Ventas = require('../Models/modelsVenta');
const Usuario = require('../Models/modelsUsuario');
const Vendedores = require('../Models/modelVendedores');
const cookie = require('cookie-parser');
const multer = require('multer');
const { default: mongoose } = require('mongoose');
const controllerUsuarios = require('../Controller/controllerUsuario');
const controllerProductos = require('../Controller/controllerProductos');

//Creando variable cookie
router.use(cookie());

//Generando ruta base de la landing page
router.get('/landing', (req, res)=>{
    res.render('pages/makeup');
});


router.get('/inicio', (req, res)=>{
    res.render('pages/index', req.cookies);
});


/*______________________________________________________________
  Login */
router.get('/loginForm', (req, res)=>{
    res.render('pages/login');
});


router.post('/login', async (req, res) => {
    const autenticacion = await Usuario.findOne({Correo:req.body.Correo});
    if (autenticacion == null){
        console.log("No llegó nada");
    }else{
        res.cookie("datos", {
            "correo":autenticacion.Correo,
            "rol":autenticacion.Rol, 
            "usuario":autenticacion.Usuario
        });
        res.render('pages/index', req.cookies);
    }
    //console.log(req.cookies);
});


router.get('/logout', (req, res) => {
    res.clearCookie('datos');
    res.redirect('/inicio');
    console.log('Sesión cerrada correctamente');
});


/* _____________________________________________________________
    Registro usuario*/
/* router.get('/registerUsuariosForm', (req, res)=>{
    res.render('pages/Usuarios/userRegister', {rol:false});
});

router.post('/registerUsuarios', controllerUsuarios.registerUsuarios */



/* ____________________________________________________________
   Productos */
   
router.get("/productos", controllerProductos.obtenerProductos());
router.get("/prodRegistros", controllerProductos.formularioRegistroProd());
router.post("/registerProd", controllerProductos.registroProd());
router.get("/listarProd", controllerProductos.listarProductos());
router.post('/delete/:Referencia', controllerProductos.eliminarProducto());
router.get('/actualizarProd/:_id', controllerProductos.formActualizarProducto());
router.post('/updateProd/:_id', controllerProductos.actualizarProductos());

const storage = multer.diskStorage({
    destination: 'FrontEnd/static/uploads/',
    filename: function(req, file, cb){
        cb(null, + Date.now() + file.originalname);
    }
});
const upload = multer({
    storage: storage
});

/* ____________________________________________________________
   Clientes  */

router.get("/clientesRegistros", (req, res) =>{
    res.render('pages/Clientes/clientRegister', req.cookies);
});

router.post("/registerClientes", (req, res) => {
    const newCliente = new Clientes({
        Nombre: req.body.Nombre,
        Telefono: req.body.Telefono,
        Direccion: req.body.Direccion,
        TotalComprado: req.body.TotalComprado,
        HistorialCompras: req.body.Historial, 
    });

    newCliente.save();

    const cliente = new Clientes();
    cliente.Cliente = new mongoose.Types.ObjectId();

    typeof cliente.Cliente;
    cliente.Cliente instanceof mongoose.Types.ObjectId;
    console.log(cliente.Cliente.toString());

    const idCliente = cliente.Cliente.toString();


    const newUsuario = new Usuario({
        Correo: req.body.Correo,
        Contrasena: req.body.Passw,
        Usuario: req.body.User,
        Rol: req.body.Rol,
        Cliente: idCliente
    });

    newUsuario.save();
    console.log('Cliente guardado');
    res.redirect('/listarClientes');
});


router.get("/listarClientes", (req, res) =>{

    Clientes.find({}, (err, clientes) =>{
        if(err){
            console.error('Ha ocurrido un error con los clientes');
        }else{
            let cooki = req.cookies;
            res.render('pages/Clientes/clientList', {datosC: clientes, datos: cookie});     
        }
    });
    //console.log("Esto es lo que trajo abajo: ", ObjectId());
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

/* _____________________________________________________________
   Ventas  */

router.get('/listVentas', (req, res) => {
    
    Ventas.find({}, (err, ventas) => {
        if(err){
            console.error("Ha ocurrido un error");
        }else{
            let cooki = req.cookies;
            res.render('pages/Ventas/listarVentas', {datosV: ventas, datos: cooki});
        }
    });
});

router.get('/registerVenta', (req, res) => {
    res.render('pages/Ventas/registerVenta', req.cookies);
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
/* ____________________________________________________________
   Vendedores  */

router.get("/vendedores", (req, res) =>{
    Vendedores.find({}, (err, vendedores) =>{
        if(err){
            console.error('Ha ocurrido un error');
        }else{
            let cooki = req.cookies;
            res.render('pages/Vendedores/vendedoresList', {ven: vendedores, datos: cooki});
        }
    });
});

router.get("/vendRegistros", (req, res) =>{
    res.render('pages/Vendedores/vendedoresRegister', req.cookies);
});

router.post("/registerVend", (req, res) => {
    const newVendedor = new Vendedores({
        Nombre: req.body.Nombre,
        Documento: req.body.Documento
    });
    newVendedor.save();
    console.log('Vendedor registrado');
    res.redirect('/vendedores');
});

router.post('/deleteVend/:Documento', (req, res) => {
    Vendedores.deleteOne({Documento: req.params.Documento}, (error) => {
        if(error){
            res.send('Error al intentar borrar este vendedor');
        }else{
            console.log('Vendedor eliminado');
            res.redirect('/vendedores');
        }
    });
});

router.get('/actualizarVend/:Documento', (req, res) => {
    Vendedores.findOne({Documento: req.params.Documento}, (err, vendedores) =>{
        if(err){
            console.error('Ha ocurrido un error');
        }else{
            res.render('pages/Vendedores/vendedoresUpdate', {datos: vendedores});
        }
    });
});

router.post('/updateVend/:Documento', (req, res) => {
    Vendedores.updateOne({Documento: req.params.Documento},
        {
            $set:{
                Nombre: req.body.Nombre,
            }
        }, (err, data) => {
            if(err){
                console.error(err);
            }else{
                res.redirect('/vendedores');
            }
        });
});

/* _____________________________________________________________ */
router.get("/conectar", (req, res)=>{
    bdc.mongoose;
});

module.exports = router;