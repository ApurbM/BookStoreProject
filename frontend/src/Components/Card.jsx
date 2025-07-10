import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {addToCart} from '../Redux/cartSlice'
import axios from 'axios';
function Card({ val }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const user = useSelector((state)=>state.user)
  function GiveInfo() {
    navigate(`/bookinfo/${val._id}`, {
      state: {
        Image: val.coverImage,
        Title: val.title,
        discription: val.description,
        price: val.newPrice,
        coverImage:val.coverImage
      }
    });
  }
  console.log(val);
async function AddToCart(e){
             e.stopPropagation(); 
       dispatch(addToCart({book:val,userid:user.CurrentUser.rest._id}))
 }

return (
    <div
      onClick={GiveInfo}
      className="flex items-start bg-gray-200 shadow-md rounded-xl overflow-hidden transition-all hover:shadow-xl cursor-pointer gap-4 p-3 w-full max-w-full"
    >
      {/* Book Image */}
      <div className="w-24 sm:w-32 h-36 sm:h-44 flex-shrink-0 overflow-hidden rounded-md border hover:scale-105 transition-transform duration-300 ease-in-out">
        <img
          src={`http://localhost:3000/uploads/${val.coverImage}`}
          alt={val.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Info Section */}
      <div className="flex flex-col justify-between w-full text-sm">
        <h2 className="text-base font-semibold text-gray-800 mb-1 line-clamp-1">
          {val.title}
        </h2>
        <p className="text-gray-600 text-sm leading-snug line-clamp-2">
          {val.description}
        </p>

        <div className="flex items-center mt-2 space-x-3 text-sm">
          <span className="text-green-600 font-semibold">
            ${val.newPrice}
          </span>
          <span className="text-red-500 line-through">
            ${val.oldPrice}
          </span>
        </div>

        <button
          className="mt-3 bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-1.5 rounded-full flex items-center gap-2 transition-all duration-300 shadow hover:shadow-md w-fit"
          onClick={(e)=>{AddToCart(e)}}
          disabled={user.CurrentUser===null}
        >
          <ShoppingCart size={16} color="white" />
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Card;
