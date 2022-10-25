const express = require('express');
const app = express();
const path = require('path');
const enrutador = require('./Routes/enrutador');
const dbm = require('./Config/connection');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'FrontEnd/src/views')); //Join es unir o juntar

app.use(express.static('FrontEnd/src/views/static/'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', enrutador);

// Para poner estatico el bootstrap app.use();

app.listen(conex = process.env.PORT || 3000, () =>{
    console.log('Ejecutando Tienda virtual', conex);
});
