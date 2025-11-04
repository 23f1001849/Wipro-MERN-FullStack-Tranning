const path = require("node:path");
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;
const defaultDatabase = process.env.MONGO_DATABASE;
const defaultCollection = process.env.MONGO_COLLECTION;

if (!mongoUri) {
  throw new Error("Missing MONGO_URI in .env. Please provide your MongoDB connection string.");
}

if (!defaultDatabase || !defaultCollection) {
  throw new Error("Missing MONGO_DATABASE or MONGO_COLLECTION in .env.");
}

const client = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let cachedDb; // Ensure we reuse the same connection across requests.

async function getDb() {
  if (!cachedDb) {
    await client.connect();
    cachedDb = client.db(defaultDatabase);
  }
  return cachedDb;
}

async function getCollection() {
  const db = await getDb();
  return db.collection(defaultCollection);
}

function sanitizeUri(uri) {
  if (!uri.includes("@")) {
    return uri;
  }
  return uri.replace(/\/\/(.+?)@/, "//****:****@");
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get("/api/config", (req, res) => {
  res.json({
    database: defaultDatabase,
    collection: defaultCollection,
    deployment: sanitizeUri(mongoUri),
  });
});

app.get("/api/ping", async (req, res) => {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    res.json({ ok: true });
  } catch (error) {
    console.error("Ping failed", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/find", async (req, res) => {
  try {
    const filter = req.body.filter ?? {};
    const projection = req.body.projection ?? {};
    const limit = Math.min(Math.max(Number(req.body.limit) || 25, 1), 200);

    const collection = await getCollection();
    const cursor = collection.find(filter, { projection }).limit(limit);
    const documents = await cursor.toArray();
    res.json({ documents });
  } catch (error) {
    console.error("Find failed", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/insert", async (req, res) => {
  try {
    const document = req.body.document;
    if (!document || typeof document !== "object") {
      return res.status(400).json({ error: "Request body must include a document object." });
    }

    const collection = await getCollection();
    const result = await collection.insertOne(document);
    res.json({ acknowledged: result.acknowledged, insertedId: result.insertedId });
  } catch (error) {
    console.error("Insert failed", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/update", async (req, res) => {
  try {
    const filter = req.body.filter;
    const update = req.body.update;
    if (!filter || typeof filter !== "object") {
      return res.status(400).json({ error: "Request body must include a filter object." });
    }
    if (!update || typeof update !== "object") {
      return res.status(400).json({ error: "Request body must include an update object." });
    }

    const collection = await getCollection();
    const result = await collection.updateOne(filter, update);
    res.json({
      acknowledged: result.acknowledged,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      upsertedId: result.upsertedId ?? null,
    });
  } catch (error) {
    console.error("Update failed", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/delete", async (req, res) => {
  try {
    const filter = req.body.filter;
    if (!filter || typeof filter !== "object") {
      return res.status(400).json({ error: "Request body must include a filter object." });
    }

    const collection = await getCollection();
    const result = await collection.deleteOne(filter);
    res.json({ acknowledged: result.acknowledged, deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Delete failed", error);
    res.status(500).json({ error: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`MongoDB console API running on http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  console.log("\nShutting down MongoDB console API...");
  try {
    await client.close();
  } catch (error) {
    console.error("Error closing MongoDB client", error);
  }
  process.exit(0);
});
