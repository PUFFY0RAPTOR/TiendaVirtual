//Actualizar en la base de datos de mongodb
const MongoCli = require("mongodb").MongoClient;

const uri = "mongodb+srv://ValeriaBustamante:w3WhljMYIRa5jadU@clusteradsi2364481.1di43ez.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoCli(uri);

async function run() {
  try {
    const database = client.db("TiendaVirtual");
    const vendedores = database.collection("Vendedores");
    const filter = { documento: "1036685537" };

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        nombre: "Valeria Ruiz"
      },
    };

    const result = await vendedores.updateOne(filter, updateDoc, options);
    console.log(
      `${result.matchedCount} documento actualizado con éxito ${result.modifiedCount} document(s)`,
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
