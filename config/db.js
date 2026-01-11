const { MongoClient } = require("mongodb");

let client;
let db;

async function connectDB() {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      console.log("MONGO_URI missing in .env");
      return;
    }

    if (db) return db;

    client = new MongoClient(uri);
    await client.connect();
    db = client.db();

    console.log("MongoDB connected");

    return db;
  } catch (err) {
    console.log("MongoDB error:", err.message);
  }
}

module.exports = connectDB;
