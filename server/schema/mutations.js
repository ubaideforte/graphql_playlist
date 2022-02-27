const graphql = require("graphql");
const Books = require("../models/bookSchama");
const Authors = require("../models/authorSchema");
const booksController = require("../controllers/booksController");
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
  name: "Mutations", // This name appear in Graphiql documentation
  fields: {
    addAuthor: {
      type: AuthorType, // This is return type
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
      resolve: async (parent, args) => {
        const response = await booksController.addBook(args);
        console.log("Response: ", response);
        return response;
      },
    },
  },
});

module.exports = Mutations;
