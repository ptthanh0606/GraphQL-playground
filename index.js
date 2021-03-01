const PORT = 5000;

// ----------------------------------------------------------------

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLList } = require("graphql");
const { books, authors } = require("./data");
const { AuthorModel, BookModel } = require("./models");
const { BookServices } = require("./services");
const app = express();

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookModel),
      description: "",
      resolve: () => books, // return all books
    },
    authors: {
      type: new GraphQLList(AuthorModel),
      resolve: () => authors, // return all authors
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => BookServices,
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

// ----------------------------------------------------------------

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);

app.listen(PORT, () => console.log("Running at " + PORT));
