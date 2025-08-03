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
  },
  commentSection: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      stars: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }
  ]
},
{timestamps:true}
);

const Book = mongoose.model('books', bookSchema);

module.exports = Book;
