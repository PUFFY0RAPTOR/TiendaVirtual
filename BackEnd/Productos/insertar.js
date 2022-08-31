const MongoCli = require("mongodb").MongoClient;

const uri = "mongodb+srv://ValeriaBustamante:w3WhljMYIRa5jadU@clusteradsi2364481.1di43ez.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoCli(uri);


async function run() {
  try {
    const database = client.db("TiendaVirtual");
    const productos = database.collection("Productos");
    const doc = {
      referencia: "123456",
      nombre: "Delineador de ojos nailen negro x 4gr",
      precio: 10054,
      stock: 100,
      imagen: null,
      estado: "habilitado",
    }
    const result = await productos.insertOne(doc);

    console.log(`Producto ingresado con el _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);