const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'FrontEnd/src/views'));

app.listen(conex = process.env.PORT || 3000, () =>{
    console.log('Ejecutando Tienda virtual', conex);
});

//Generando ruta base de la landing page
app.get("/", (req, res)=>{
    res.render('pages/makeup');
});

//Ruta de los productos
app.get("/productos", (req, res) =>{
    res.render('pages/products');
});

//Ruta de los registros de los productos
app.get("/prodRegistros", (req, res) =>{
    res.render('pages/productsRegister');
});

















//valorAccedido = doc.ubicacion[0].latitud //Acceder al dato

//doc.ubicacion[0].latitud = Valoringresado //Ingresar el dato

//imagenes = ['https://imagen1', 'https://imagen1', 'https://imagen1'];

