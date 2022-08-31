//Actualizar en la base de datos de mongodb
const MongoCli = require("mongodb").MongoClient;

const uri = "mongodb+srv://ValeriaBustamante:w3WhljMYIRa5jadU@clusteradsi2364481.1di43ez.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoCli(uri);

async function run() {
  try {
    const database = client.db("TiendaVirtual");
    const productos = database.collection("Productos");
    const filter = { referencia: "123456" };

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        precio: 15000
      },
    };

    const result = await productos.updateOne(filter, updateDoc, options);
    console.log(
      `${result.matchedCount} documento actualizado con éxito ${result.modifiedCount} document(s)`,
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
