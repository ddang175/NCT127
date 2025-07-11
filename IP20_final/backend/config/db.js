const { MongoClient } = require("mongodb");
const { mongoURI, dbName } = require("./env");

let client;
let db;
//db connections
async function connectDB() {
  if (!client) {
    client = new MongoClient(mongoURI);
    await client.connect();
    db = client.db(dbName);
    console.log(`Connected to MongoDB database: ${dbName}`);
  }
  return { client, db };
}
//clsoing db connections
async function closeConnection() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log("MongoDB connection closed");
  }
}

module.exports = {
  connectDB,
  closeConnection,
  ObjectId: require("mongodb").ObjectId
};