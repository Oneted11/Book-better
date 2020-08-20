express = require("express");
const { graphqlHTTP } = require("express-graphql");
graphql = require("graphql");
const { MongoClient } = require("mongodb");
require("dotenv").config();
require("graphql-import-node/register");
const { buildSchema } = require("graphql");

const typeDefs = require("./schema");
// schema=buildSchema(schemaDoc)
const resolvers = require("./resolvers");
const { makeExecutableSchema } = require("graphql-tools");
const schema = makeExecutableSchema({ typeDefs, resolvers });
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
    // const collection = database.collection("books");
    console.log("database connected successfully");
    app.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
        context: database,
      })
    );
    app.get("/", (req, res) => res.send("we are live"));
    // const server =()=>{ app.listen(PORT, () => {
      //   console.log(`the api is running at http://localhost:${PORT}`);
      // });}
      // console.log("schema=>", schema);
      // console.log("context.....:",database)
    app.listen(PORT, () => {
      console.log(`the api is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.dir(error);
  }
};
run();
