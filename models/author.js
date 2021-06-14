const mongoose = require('mongoose');

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
    default: '/uploads/default-author-img.jpg',
  },
  books: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Books'
    }
  ]
});

authorSchema.methods.addBook = function(authorId, cb) {
  this.books.push(authorId);
  return this;
}

module.exports = mongoose.model('Authors', authorSchema);
