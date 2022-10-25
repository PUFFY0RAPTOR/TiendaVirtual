const mongoose = require('mongoose');

const uri = 'mongodb+srv://SebastianPertuz:123456sebas@clusteradsi2364481.uulort2.mongodb.net/TiendaVirtual?retryWrites=true&w=majority';

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(uri, connectionParams)
    .then(()=>{
        console.log('Conectado a la base de datos')
    })
    .catch((err)=>{
        console.log(`Error en la conexión --- ${err}`);
    })
    
module.exports= mongoose;
