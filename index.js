const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@rhidys-cook-book.ms5fwvj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.get('/', (req, res) => {
    res.send("Rhidys-Cook-Book server is running..........");
})

app.listen(port, () => {
    console.log(`Rhidys-Cook-Book Server is running on ${port}`);
});
