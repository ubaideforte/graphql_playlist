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
        return Authors.findById(id);
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
        return Books.find({ authorId: id });
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
        const { id } = args;
        return Books.findById(id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => {
        const { id } = args;
        return Authors.findById(id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () => {
        return Books.find().limit(10);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => {
        return Authors.find();
      },
    },
  },
});

const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        const { name, age } = args;
        const author = new Authors({ name, age });
        author.save();
        return author;
      },
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLString },
        rating: { type: GraphQLInt },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        const book = new Books(args);
        book.save();
        return book;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
