import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { FaStar } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md';

function BookInfo() {
  const { state } = useLocation();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [commentList, setCommentList] = useState([]);
  const token = localStorage.getItem('token');
  const userid = useSelector((state) => state?.user?.CurrentUser?._id);

  const fetchComment = async () => {
    try {
      const res = await axios.get('https://bookstoreproject-yg34.onrender.com/api/comment/getComment', {
        headers: {
          Authorization: `Bearer ${token}`,
          bookid: state.BookId,
        },
      });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }
      setCommentList(res.data.bookArray.commentSection);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        'https://bookstoreproject-yg34.onrender.com/api/comment/addComment',
        {
          comment: reviewText,
          stars: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            bookid: state.BookId,
          },
        }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }

      setReviewText('');
      setRating(0);
      toast.success('Review added successfully');
      fetchComment(); // Refresh comments
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.put(
        'https://bookstoreproject-yg34.onrender.com/api/comment/removeComment',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            bookid: state.BookId,
            commentid: commentId,
          },
        }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }

      toast.success('Comment deleted successfully');
      fetchComment(); // Refresh the comments
    } catch (err) {
      console.log(err);
      toast.error('Error deleting comment');
    }
  };

  if (!state) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl text-gray-600">No Book Data Available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Book Info */}
      <div className="w-full flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full lg:w-1/3 flex justify-center items-start p-4 border-0 border-r">
          <img
            src={state.coverImage}
            alt="Book Cover"
            className="rounded-lg w-full max-w-sm object-cover"
          />
        </div>

        <div className="w-full lg:w-2/3 flex flex-col justify-start gap-4 p-6">
          <h1 className="text-3xl font-bold text-gray-800">{state.Title}</h1>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-xl font-semibold text-green-700">Price: ₹{state.price || 'N/A'}</p>
            <div className="flex gap-2">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded">
                Add to Cart
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
                Buy Now
              </button>
            </div>
          </div>

<div className="mt-4 max-h-[400px] overflow-y-auto pr-2">
 
    <p className="text-2xl text-gray-700">
  <ReactMarkdown
    components={{
      p: ({ node, ...props }) => <>{props.children}</>, // remove extra <p> from inside markdown
    }}
  >
    {state.discription}
  </ReactMarkdown>
</p>

</div>

        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customer Reviews</h2>
        <div className="space-y-6">
          {commentList.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            commentList.map((item) => (
              <div key={item._id} className="flex items-start gap-4 relative group bg-gray-50 p-3 rounded-md shadow-sm">
                {item.userId?.profileImage ? (
                  <img
                    src={item.userId.profileImage}
                    alt="profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {item.userId?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}

                <div className="flex-1">
                  <p className="text-gray-800 text-base font-semibold">{item.userId?.username || 'Unknown'}</p>
                  <p className="text-gray-800 mb-1 italic">“{item.comment}”</p>
                  <p className="text-yellow-500 text-lg">
                    {'⭐️'.repeat(item.stars)}{'☆'.repeat(5 - item.stars)}
                  </p>
                </div>

                {/* Show Remove if it's the user's comment */}
                {userid === item.userId?._id && (
                  <button
                    onClick={() => handleDeleteComment(item._id)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <MdDelete size={25} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Write a Review */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Write a Review</h2>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                    className="hidden"
                  />
                  <FaStar
                    size={24}
                    color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                    className="cursor-pointer"
                  />
                </label>
              );
            })}
          </div>

          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            placeholder="Write your review here..."
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookInfo;
