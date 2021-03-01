const {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
} = require("graphql");

const BookType = new GraphQLObjectType({
  name: "Books",
  description: "Books written by authors",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    authorId: {
      type: GraphQLNonNull(GraphQLInt),
    },
  }),
});

module.exports = BookType;
