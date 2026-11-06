
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const client = new MongoClient(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

let animes;

app.get('/api/animes', async (req, res) => {
    const records = await animes.find({}).toArray();
    res.json(records);
});

app.post('/api/animes', async (req, res) => {
    const result = await animes.insertOne(req.body);
    res.status(201).json({ message: 'Anime added successfully' });
});

app.put('/api/animes/:id', async (req, res) => {
    await animes.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json({ message: 'Anime updated successfully' });
});

app.delete('/api/animes/:id', async (req, res) => {
    await animes.deleteOne({
        _id: new ObjectId(req.params.id)
    });
    res.json({ message: 'Anime deleted successfully' });
});

async function startServer() {
    await client.connect();
    const db = client.db('AnimeVerseDB');
    animes = db.collection('Animes');

    app.listen(5000, () => {
        console.log('AnimeVerse backend running on port 5000');
    });
}

startServer().catch(console.error);
