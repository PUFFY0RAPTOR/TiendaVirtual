const MongoCli = require("mongodb").MongoClient;
//Vale te falta el zoom
const uri = "mongodb+srv://ValeriaBustamante:w3WhljMYIRa5jadU@clusteradsi2364481.1di43ez.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoCli(uri);

async function run() {
  try {
    const database = client.db("TiendaVirtual");
    const clientes = database.collection("Clientes");
    // create a document to insert
    const doc = {
      nombre: "Emiliano",
      tel: "3055688545",
      ubicacion: [
        {
            latitud:  6.217,
            longitud: -75.567 
        },
      ],
      totalComprado: 135900,
      historicoCompras:[
        {
            producto: "Hidratante Labial Dior Lip Glow 3.5 g",
            total: 135900,
            vendedor: "Valeria Bustamante"
        },
      ],
    }
    const result = await clientes.insertOne(doc);

    console.log(`Cliente ingresado con el _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);