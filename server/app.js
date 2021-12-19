const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://mongodb-university:p3lvckgr@sandbox.ajavt.mongodb.net/graphql-playlist`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((args) => {
    console.log("Database Connection Successful!");
  })
  .catch((err) => {
    console.log("Database Connection Failed\n", err);
  });

const schema = require("./schema/schema");

const app = express();

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
