const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    default: "/uploads/default-author-img.jpg",
  },
  books: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Books",
    },
  ],
});

authorSchema.methods.getBooks = function (cb) {
  return Promise.all(
    this.books.map(
      async (book) => await mongoose.model("Books").findById(book)
    ),
    cb
  );
};

authorSchema.statics.selectAll = async function (cb) {
  const authors = await this.find();
  const authorsWithBooks = await Promise.all(
    authors.map(async (author) => ({
      ...author._doc,
      books: await author.getBooks(),
    }))
  );

  return authorsWithBooks;
};

authorSchema.methods.addBook = function (authorId, cb) {
  this.books.push(authorId);
  return this;
};

module.exports = mongoose.model("Authors", authorSchema);
