const { GraphQLList, GraphQLString, GraphQLObjectType } = require("graphql");

const Author = require("../../models/author");


const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    _id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    imgUrl: { type: GraphQLString },
    books: { type: GraphQLList(BookType) },
  }),
});

const authorQueryFields = {
  authors: {
    type: GraphQLList(AuthorType),
    async resolve() {
      const authors = await Author.selectAll();
      return authors;
    },
  },
};

const authorMutationFields = {
  addAuthor: {
    type: AuthorType,
    args: {
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      imgUrl: { type: GraphQLString },
    },
    async resolve(parentValue, args) {
      const author = new Author({
        firstName: args.firstName,
        lastName: args.lastName,
        imgUrl: args.imgUrl,
      });

      return await author.save();
    },
  },
};

module.exports = {
  AuthorType,
  authorQueryFields,
  authorMutationFields,
};

const { BookType } = require("../book-type/bookType");
