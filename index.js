const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 4000
require('dotenv').config()

// Middletare
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})




const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.9zftmdj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function run() {
  try {
    client.connect()
    const inventoryCollection = client.db("manufacture").collection("tools");

    // Load  Inventory
    app.get("/inventorys", async (req, res) => {
      const query = {};
      const cursor = inventoryCollection.find(query);
      const result = await cursor.toArray()
      res.send(result);
    })

  }
  catch {

  }

}

run()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})