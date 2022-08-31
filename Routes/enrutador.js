const express = require('express');
const router = express.Router();
const bdc = require('../Config/connection');

//Generando ruta base de la landing page
router.get('/landing', (req, res)=>{
    res.render('pages/makeup');
});

//Ruta de los productos
router.get("/productos", (req, res) =>{
    res.render('pages/Productos/products');
});

//Ruta de los registros de los productos
router.get("/prodRegistros", (req, res) =>{
    res.render('pages/Productos/productsRegister');
});

//Ruta listar los productos
router.get("/listarProd", (req, res) =>{
    res.render('pages/Productos/productsList');
});

router.get("/conectar", (req, res)=>{
    bdc.mongoose;
});

module.exports = router;