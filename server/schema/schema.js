const graphql = require("graphql");
const Books = require("../models/bookSchama");
const Authors = require("../models/authorSchema");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
} = graphql;

/**
 * Book Type
 */
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    author: {
      type: AuthorType,
      resolve: (parents) => {
        const { authorId: id } = parents;
        // return dummyAuthors.find((item) => item.id === id);
      },
    },
  }),
});

/**
 * Auhtor Type
 */
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parents) => {
        const { id } = parents;
        // return dummyBooks.filter((item) => item.authorId === id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => {
        // return dummyBooks.find((item) => item.id === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => {
        // return dummyAuthors.find((item) => item.id === args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () => {
        // return dummyBooks;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => {
        // return dummyAuthors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
