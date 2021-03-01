const { GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");
const { books } = require("../data");
const { BookModel } = require("../models");

module.exports = {
  addBook: {
    type: BookModel, // Add new book will return new Book model
    args: {
      // Args will be pass to the query
      name: {
        type: GraphQLNonNull(GraphQLString),
      },
      authorId: {
        type: GraphQLNonNull(GraphQLInt),
      },
    },
    resolve: (parent, args) => {
      const book = {
        id: books.length + 1,
        name: args.name,
        authorId: args.authorId,
      };

      books.push(book);

      return book;
    },
  },
  updateBook: {
    type: BookModel,
    args: {
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
      authorId: { type: GraphQLInt },
    },
    resolve: (parent, args) => {
      const selectedBook = books.find((book) => book.id === args.id);

      const book = {
        ...selectedBook,
        ...args,
      };

      books.splice(books.indexOf(selectedBook), 1, book);

      return book;
    },
  },
  deleteBook: {
    type: BookModel,
    args: {
      id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: (parent, args) => {
      return books.splice(
        books.findIndex((book) => book.id === args.id),
        1
      );
    },
  },
};
