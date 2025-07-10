import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { FaStar } from 'react-icons/fa';

function BookInfo() {
  const { state } = useLocation();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState('');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (rating && reviewText.trim()) {
      alert('Review submitted!');
      setRating(0);
      setHover(null);
      setReviewText('');
    } else {
      alert('Please give a rating and write a review.');
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
      {/* Full Width Container */}
      <div className="w-full flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden">

        {/* Left Side: Image */}
        <div className="w-full lg:w-1/3 flex justify-center items-start p-4">
          <img
            src={`http://localhost:3000/uploads/${state.coverImage}`}
            alt="Book Cover"
            className="rounded-lg w-full max-w-sm object-cover"
          />
        </div>

        {/* Right Side: Info */}
        <div className="w-full lg:w-2/3 flex flex-col justify-start gap-4 p-6">

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800">{state.Title}</h1>

          {/* Price & Buttons */}
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

          {/* Description */}
          <div className="mt-4 max-h-[300px] overflow-y-auto pr-2">
            <p className="text-gray-700 text-xl font-sans whitespace-pre-line">
              {state.discription} 
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customer Reviews</h2>

        <div className="space-y-6">
          {[
            { initial: 'A', text: 'Very insightful and engaging!', stars: 4 },
            { initial: 'R', text: 'Perfect for anyone interested in this genre.', stars: 5 },
            { initial: 'M', text: 'Well written and easy to understand.', stars: 4 }
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {r.initial}
              </div>
              <div>
                <p className="text-gray-800 text-base mb-1">“{r.text}”</p>
                <p className="text-yellow-500 text-lg">{'⭐️'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Write a Review</h2>

        <form onSubmit={handleReviewSubmit} className="space-y-4">

          {/* Star Rating */}
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

          {/* Textarea */}
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            placeholder="Write your review here..."
          />

          {/* Submit */}
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
