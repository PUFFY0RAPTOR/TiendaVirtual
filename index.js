const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.listen(conex = process.env.PORT || 3060, () =>{
    console.log('Ejecutando Tienda virtual');
});

//Generando ruta base de la landing page
app.get("/", (req, res)=>{
    res.render('pages/makeup');
});

//valorAccedido = doc.ubicacion[0].latitud //Acceder al dato

//doc.ubicacion[0].latitud = Valoringresado //Ingresar el dato

imagenes = ['https://imagen1', 'https://imagen1', 'https://imagen1'];

