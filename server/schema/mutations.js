const graphql = require("graphql");
const Books = require("../models/bookSchama");
const Authors = require("../models/authorSchema");
const { AuthorType, BookType } = require("./types");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
} = graphql;

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

module.exports = Mutations;
