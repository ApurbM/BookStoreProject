const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['adventure', 'fiction', 'non-fiction', 'fantasy', 'science', 'books','horror','marketing'], // extend as needed
  },
  trending: {
    type: Boolean,
    default: false,
  },
  coverImage: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  }
},
{timestamps:true}
);

const Book = mongoose.model('books', bookSchema);

module.exports = Book;
