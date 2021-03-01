const {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
} = require("graphql");

const BookModel = require("./Book");

const AuthorType = new GraphQLObjectType({
  name: "Authors",
  description: "Author of books",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    ownedBooks: {
      type: new GraphQLList(BookModel),
      resolve: (author) => books.filter((book) => book.authorId === author.id),
    },
  }),
});

module.exports = AuthorType;
