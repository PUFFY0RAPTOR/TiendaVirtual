const MongoCli = require("mongodb").MongoClient;

const uri = "mongodb+srv://ValeriaBustamante:w3WhljMYIRa5jadU@clusteradsi2364481.1di43ez.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoCli(uri);


async function run() {
  try {
    const database = client.db("TiendaVirtual");
    const ventas = database.collection("Ventas");
    // create a document to insert
    const doc = {
      producto: "Delineador de ojos nailen negro x 4gr",
      subtotal: 8854,
      total: 10054,
      cliente: "Emiliano",
      vendedor: "Valeria Bustamante",
    }
    const result = await ventas.insertOne(doc);

    console.log(`Producto ingresado con el _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);