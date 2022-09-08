const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
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
    const toolsCollection = client.db("manufacture").collection("tools");
    const orderCollection = client.db("manufacture").collection("orders");
    const blogsCollection = client.db("manufacture").collection("blogs");
    const reviewCollection = client.db("manufacture").collection("reviews");
    const profileCollection = client.db("manufacture").collection("profiles");
    

    // Tools Collection
    app.get("/tools", async (req, res) => {
      const result = await toolsCollection.find().toArray();
      res.send(result)
    });

    // Specifice Id Tools
    app.get("/tool/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const tools = await toolsCollection.findOne(filter);
      res.send(tools);
    });

    // Add Users
    app.post("/tools", async (req, res) => {
      const tools = req.body;
      const result = await toolsCollection.insertOne(tools)
      res.send(result)
    });

    app.delete("/tool/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await toolsCollection.deleteOne(filter);
      res.send(result);
    });


 // Order- Data
 
    // User Order Data
    app.post("/orders", async (req, res) => {
      const order = req.body;
      // const query = { email: order.email }
      const result = await orderCollection.insertOne(order);
      res.send(result)
    });

    // User Ordering-Data per User
    app.get("/order", async (req, res) => {
      const email = req.query.email;
      const filter = { email: email }
      const cursor = orderCollection.find(filter);
      const result = await cursor.toArray()
      res.send(result);
    });

    // Load All User Aded Order
    app.get("/orders", async (req, res) => {
      const result = await orderCollection.find().toArray()
      res.send(result)
    });

    // Order Data Delete Normal User
    app.delete("/order/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(filter);
      res.send(result);
    });

    // Payment Order Data
    app.get("/order/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await orderCollection.findOne(filter);
      res.send(result);
    });


    // Review And Profile Update
        // Reviews Get
        app.get("/reviews", async (req, res) => {
          const result = await reviewCollection.find().toArray()
          res.send(result)
        });
    
        // Post Reviews
        app.post("/review", async (req, res) => {
          const reviews = req.body;
          const result = await reviewCollection.insertOne(reviews);
          res.send(result)
        });
    
    
        // Profile Update
        app.post("/profile", async (req, res) => {
          const user = req.body;
          const result = await profileCollection.insertOne(user);
          res.send(result)
        });

    
    // Load All Blogs
    app.get("/blogs", async (req, res) => {
      const result = await blogsCollection.find().toArray();
      res.send(result)
    });

    app.get("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const blogs = await blogsCollection.findOne(filter);
      res.send(blogs);
    });




  }
  catch {

  }

}

run()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})