import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eventia';
const dbName = process.env.MONGODB_DB || extractDatabaseName(mongoUri) || 'Eventia';

let db;
let registrations;

async function connectDatabase() {
    const client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db(dbName);
    registrations = db.collection('registrations');
    await registrations.createIndex({ email: 1, createdAt: -1 });
}

function extractDatabaseName(uri) {
    try {
        const parsed = new URL(uri);
        const cleanedPath = parsed.pathname.replace(/^\//, '');
        return cleanedPath || null;
    } catch (error) {
        console.warn('Unable to infer database name from URI, falling back to default.', error.message);
        return null;
    }
}

app.use(cors());
app.use(express.json());

function sanitizePayload(payload = {}) {
    const { name, email, phone, eventType, details, termsAccepted } = payload;
    return {
        name: typeof name === 'string' ? name.trim() : '',
        email: typeof email === 'string' ? email.trim().toLowerCase() : '',
        phone: typeof phone === 'string' ? phone.trim() : '',
        eventType: typeof eventType === 'string' ? eventType : 'Other',
        details: typeof details === 'string' ? details.trim() : '',
        termsAccepted: Boolean(termsAccepted)
    };
}

app.post('/api/registrations', async (req, res) => {
    try {
        const payload = sanitizePayload(req.body);
        const { name, email, phone, details, termsAccepted } = payload;

        if (!name || !email || !phone || !details || !termsAccepted) {
            return res.status(400).json({ message: 'Missing required fields or terms not accepted.' });
        }

        const document = {
            ...payload,
            createdAt: new Date()
        };

        const { insertedId } = await registrations.insertOne(document);
        res.status(201).json({ id: insertedId, message: 'Registration saved.' });
    } catch (error) {
        console.error('POST /api/registrations failed', error);
        res.status(500).json({ message: 'Server error while saving registration.' });
    }
});

app.get('/api/registrations', async (_req, res) => {
    try {
        const docs = await registrations
            .find({}, { projection: { name: 1, email: 1, phone: 1, eventType: 1, createdAt: 1, details: 1 } })
            .sort({ createdAt: -1 })
            .limit(25)
            .toArray();
        res.json(docs);
    } catch (error) {
        console.error('GET /api/registrations failed', error);
        res.status(500).json({ message: 'Server error while loading registrations.' });
    }
});

app.delete('/api/registrations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await registrations.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Registration not found.' });
        }
        res.json({ message: 'Registration removed.' });
    } catch (error) {
        console.error('DELETE /api/registrations/:id failed', error);
        res.status(500).json({ message: 'Server error while removing registration.' });
    }
});

app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});

connectDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Registration API listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    });
