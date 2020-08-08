express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();

const {
  PORT = 3500,

  DB_URL = "mongodb://localhost:27017",
} = process.env;
const client = new MongoClient(DB_URL, { useUnifiedTopology: true });
const run = async () => {
  try {
    await client.connect();
    const database = client.db("test-book");
    const collection = database.collection("books");
    console.log("database connected successfully");
    server()
  } catch (error){
    console.dir(error);
  }
};
run();
app.get("/", (req, res) => res.send("we are live"));
const server =()=>{ app.listen(PORT, () => {
  console.log(`the api is running at http://localhost:${PORT}`);
});}
