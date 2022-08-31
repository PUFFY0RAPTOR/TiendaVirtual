//Conexión con la base de datos
//Importar mongoose
//Definir const URI
//Def variable para la BD otra para la conexión

const mongoose = require('mongoose');

const uri = 'mongodb+srv://ValeriaBustamante:w3WhljMYIRa5jadU@clusteradsi2364481.1di43ez.mongodb.net/test';

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(uri, connectionParams)
    .then(()=>{
        console.log('Conectado a la base de datos')
    })
    .catch((err)=>{
        console.log(`Error en la conexión ${err}`);
    })
    
module.exports={
    mongoose
}
