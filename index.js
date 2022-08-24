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
    res.render('pages/tiendaVirtual');
})

//Demás url

