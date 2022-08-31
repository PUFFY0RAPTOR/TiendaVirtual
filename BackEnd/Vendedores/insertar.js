const MongoCli = require("mongodb").MongoClient;

const uri = "mongodb+srv://ValeriaBustamante:w3WhljMYIRa5jadU@clusteradsi2364481.1di43ez.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoCli(uri);

async function run() {
  try {
    const database = client.db("TiendaVirtual");
    const vendedores = database.collection("Vendedores");
    // create a document to insert
    const doc = {
      nombre: "Valeria Bustamante",
      documento: "1036685537",
      VentasDespachadas: [
        {
            producto: "Delineador de ojos nailen negro x 4gr",
            subtotal: 8854,
            impuesto: 1200,
            totalVenta: 10054,
            cliente: "Emiliano",
        },
      ],
    }
    const result = await vendedores.insertOne(doc);

    console.log(`Vendedor ingresado con el _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);