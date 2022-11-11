const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@rhidys-cook-book.ms5fwvj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
      const serviceCollection = client.db("Rhidys-Cook-Book").collection("services");
        app.get('/services', async (req, res) => {
          const cursor = serviceCollection.find({});
          const services = await cursor.toArray()
          res.send(services)
     })
        app.get('/services-at-home', async (req, res) => {
          const cursor = serviceCollection.find({});
          const serviceAtHomes = await cursor.skip(3).limit(3).toArray();
          res.send(serviceAtHomes)
     })
      app.get('/services/:id', async (req, res) => {
        const id = req.params.id;
          const query = {_id: ObjectId(id)}
          const service = await serviceCollection.findOne(query)
          res.send(service)
     })
      app.get('/:id', async (req, res) => {
        const id = req.params.id;
          const query = {_id: ObjectId(id)}
          const service = await serviceCollection.findOne(query)
          res.send(service)
      })
      const reviewCollection = client.db('Rhidys-Cook-Book').collection('reviews');
      app.post('/reviews', async (req, res) => {
        const review = req.body;
        const result = await reviewCollection.insertOne(review);
        res.send(result);
    });
    } 
    finally {
      
    }
  }
  run().catch(error => console.error(error));

app.get('/', (req, res) => {
    res.send("Rhidys-Cook-Book server is running..........");
})

app.listen(port, () => {
    console.log(`Rhidys-Cook-Book Server is running on ${port}`);
});
