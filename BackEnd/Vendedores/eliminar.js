//Eliminar de la basee de datos de mongodb
const MongoCli = require("mongodb").MongoClient;

const uri = "mongodb+srv://ValeriaBustamante:w3WhljMYIRa5jadU@clusteradsi2364481.1di43ez.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoCli(uri);

async function run() {
  try {
    const database = client.db("TiendaVirtual");
    const vendedores = database.collection("Vendedores");
    const query = { documento: "1036685537" };

    const result = await vendedores.deleteOne(query);
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
