const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    default: '/uploads/default-book-img.jpg',
  },
  authorId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Authors'
  }
});

bookSchema.methods.getAuthor = function(cb) {
  return mongoose.model('Authors').findById(this.authorId, cb);
}

module.exports = mongoose.model('Books', bookSchema);
