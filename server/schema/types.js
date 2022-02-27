const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
} = graphql;

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

module.exports = { AuthorType, BookType };
