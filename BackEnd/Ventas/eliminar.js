//Eliminar de la basee de datos de mongodb
const MongoCli = require("mongodb").MongoClient;

const uri = "mongodb+srv://ValeriaBustamante:w3WhljMYIRa5jadU@clusteradsi2364481.1di43ez.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoCli(uri);

async function run() {
  try {
    const database = client.db("TiendaVirtual");
    const ventas = database.collection("Ventas");
    const query = {producto: "Delineador de ojos nailen negro x 4gr"};

    const result = await ventas.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Eliminado correctamente");
    } else {
      console.log("Documento no encontrado");
    }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
