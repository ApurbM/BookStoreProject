const books = require('../Models/books');

const addComment = async (req, res, next) => {
  const userId = req.user.id;
  const bookId = req.headers.bookid;
  const { comment, stars } = req.body;

  try {
    if (stars < 1 || stars > 5) {
      return res.status(400).json({
        success: false,
        message: 'Stars must be between 1 and 5'
      });
    }

    const commentVal = {
      userId,
      comment,
      stars,
      createdAt: new Date()
    };

    await books.findByIdAndUpdate(bookId, {
      $push: { commentSection: commentVal }
    });

    res.status(200).json({ success: true, message: "Comment added successfully" });

  } catch (err) {
    next(err);
  }
};

const getAllComments = async (req, res, next) => {
  const bookId = req.headers.bookid;

  if (!bookId) {
    return res.status(400).json({
      success: false,
      message: 'bookid is required'
    });
  }

  try {
    const book = await books.findById(bookId)
      .populate('commentSection.userId', 'username profileImage')
      .exec();

    res.status(202).json({
      success: true,
      message: 'List of comments',
      bookArray: book
    });
  } catch (err) {
    next(err);
  }
};

const removeComment = async (req, res, next) => {
  const commentId = req.headers.commentid;
  const userId = req.user.id;
  const bookId = req.headers.bookid;

  try {
    if (!bookId || !commentId) {
      return res.status(400).json({
        success: false,
        message: 'Missing bookId or commentId'
      });
    }

    const book = await books.findById(bookId);
    const comment = book.commentSection.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    if (!comment.userId.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment'
      });
    }

    await books.findByIdAndUpdate(bookId, {
      $pull: { commentSection: { _id: commentId } }
    });

    res.status(200).json({ success: true, message: "Comment removed successfully" });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  addComment,
  getAllComments,
  removeComment,
};
