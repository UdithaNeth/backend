import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

let client;
let db;

export async function connectDB() {
  if (!client) {
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  }
  return db;
}
