//Actualizar en la base de datos de mongodb
const MongoCli = require("mongodb").MongoClient;

const uri = "mongodb+srv://ValeriaBustamante:w3WhljMYIRa5jadU@clusteradsi2364481.1di43ez.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoCli(uri);

async function run() {
  try {
    const database = client.db("TiendaVirtual");
    const clientes = database.collection("Clientes");

    const filter = { nombre: "Emiliano" };

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        nombre: `Emiliano Bustamante`
      },
    };

    const result = await clientes.updateOne(filter, updateDoc, options);
    console.log(
      `${result.matchedCount} documento actualizado con éxito ${result.modifiedCount} document(s)`,
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
