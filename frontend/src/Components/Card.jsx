import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';

function Card({ val }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  function GiveInfo() {
    navigate(`/bookinfo/${val._id}`, {
      state: {
        BookId: val._id,
        Image: val.coverImage,
        Title: val.title,
        discription: val.description,
        price: val.newPrice,
        coverImage: val.coverImage,
      },
    });
  }

  async function AddToCart(e) {
    e.stopPropagation();
    dispatch(addToCart({ book: val, userid: user.CurrentUser._id }));
  }

  return (
    <div
      onClick={GiveInfo}
      className="bg-blue-100 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer w-full max-w-xs p-5 flex flex-col items-center relative"
    >
      {/* Label */}
      <span className="absolute top-3 left-3 bg-purple-200 text-purple-800 text-xs font-medium px-2 py-1 rounded">
        Nearest Seller
      </span>

      {/* Image */}
      <div className="w-36 h-36 mb-5">
        <img
          src={val.coverImage}
          alt={val.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Title */}
      <h2 className="text-base font-semibold text-gray-800 text-center mb-1 line-clamp-1">
        {val.title}
      </h2>

      {/* Shipping */}
      <p className="text-gray-500 text-xs mb-1">Shipped in 3-4 days</p>

      {/* Prices */}
      <div className="flex items-center gap-2 text-sm mb-4">
        <span className="font-bold text-gray-800">${val.newPrice}</span>
        <span className="line-through text-gray-400">${val.oldPrice}</span>
      </div>

      {/* Add to Cart */}
      <button
        onClick={(e) => AddToCart(e)}
        disabled={user.CurrentUser === null}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
      >
        <ShoppingCart size={16} />
        Add to Cart
      </button>
    </div>
  );
}

export default Card;
