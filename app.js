const express = require('express');
const app = express();
const path = require('path');
const dbm = require('./Config/connection');


//Configurando el motor de renderizado con ejs.
app.set('view engine', 'ejs');

//Uniendo la ruta absoluta del proyecto con la carpeta 'views'.
//Join es unir, ruta absoluta, deme el directorio base del proyecto y lo une con las vistas
app.set('views', path.join(__dirname, 'FrontEnd/src/views')); 

//Express usará los recursos estáticos que están en la carpeta 'static'.
app.use(express.static('FrontEnd/src/views/static/'));

/* Función middleware para reconocer la solicitud como cadenas o arrays 
    Analiza el request object entrante si es un objeto con objetos anidados o de cualquier tipo*/
app.use(express.urlencoded({ extended: true }));

/* Función middleware integrada en Express para reconocer la solicitud entrante como un objeto json. */
app.use(express.json());

//Usando '/' como ruta base a la hora de ejecutar el proyecto
app.use('/', require('./Routes/enrutador'));

//Configurando el puerto donde se ejecutará el proyecto.
app.listen(conex = process.env.PORT || 3100, () =>{
    console.log('Ejecutando Tienda virtual', conex);
});
