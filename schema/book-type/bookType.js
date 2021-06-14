const {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType,
} = require('graphql');

const Book = require('../../models/book');
const Author = require('../../models/author');

const { AuthorType } = require('../author-type/authorType');

const BookType = new GraphQLObjectType({
  name: 'BookType',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    imgUrl: { type: GraphQLString },
    author: { type: AuthorType }
  }),
});

const bookQueryFields = {
  books: {
    type: GraphQLList(BookType),
    async resolve() {
      const books = await Book.find();
      return await Promise.all(books.map(async book => ({ ...book._doc, author: await book.getAuthor() })));
    }
  },
  book: {
    type: BookType,
    args: {
      id: { type: GraphQLString }
    },
    async resolve(parentValue, args) {
      const book = await Book.findById(args.id);
      return {
        ...book._doc,
        author: await book.getAuthor(),
      };
    }
  }
}

const bookMutiationFields = {
  addBook: {
    type: BookType,
    args: {
      id: { type: GraphQLString },
      title: { type: GraphQLString },
      imgUrl: { type: GraphQLString },
      authorId: { type: GraphQLString }
    },
    async resolve(parentValue, args) {
      const book = new Book({
        title: args.title,
        imgUrl: args.imgUrl,
        authorId: args.authorId,
      });
      const author = await Author.findById(args.authorId);
      author.addBook(book._id);
      await author.save();
      return await book.save();
    }
  },
}

module.exports = {
  BookType,
  bookQueryFields,
  bookMutiationFields
}
