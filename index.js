const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ldet0tm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();

        const serviceCollection = client.db('edTech').collection('services');

        app.get('/services', async (req, res) => {
            const result = await serviceCollection.find().toArray();
            res.send(result);
        });
    }
    finally{ }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello from Ed Tech website')
})
  
app.listen(port, () => {
    console.log(`Ed-tech app listening on port ${port}`)
})
