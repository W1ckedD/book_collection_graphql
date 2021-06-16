const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Book'
    }
  ],
  authors: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Author'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
