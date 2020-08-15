express = require("express");
const { graphqlHTTP } = require("express-graphql");
graphql = require("graphql");
const { MongoClient } = require("mongodb");
require("dotenv").config();
require("graphql-import-node/register");

const schema = require("./schema.graphql");
const resolvers = require("./resolvers");
const { buildSchema } = require("graphql");
const app = express();
// const MyGraphQLSchema=buildSchema(typeDefs,resolvers)
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
    app.listen(PORT, () => {
      console.log(`the api is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.dir(error);
  }
};
run();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.get("/", (req, res) => res.send("we are live"));
// const server =()=>{ app.listen(PORT, () => {
//   console.log(`the api is running at http://localhost:${PORT}`);
// });}
