import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner';
import BookC from '../Components/BookC';
import { useSelector,useDispatch } from 'react-redux';
import { fetchCart } from '../Redux/cartSlice';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Home() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/user/auth-check', {
          withCredentials: true
        });
        if (!res.data.authenticated) {
          navigate('/login');
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkAuth();
    dispatch(fetchCart(user?.CurrentUser?.rest?._id));    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

if (loading) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <div className="w-4/5 max-w-md">
        <div className="text-center mb-4 text-lg text-pink-600 font-semibold animate-pulse">
          Loading your dashboard...
        </div>

        <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-gradient-to-r from-pink-400 via-pink-600 to-pink-400 animate-loading-bar rounded-full"></div>
        </div>
      </div>

      <style>
        {`
          @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          .animate-loading-bar {
            animation: loadingBar 1.5s linear infinite;
            width: 100%;
          }
        `}
      </style>
    </div>
  );
}

  return (
    <div>
      <Banner />
      <BookC />
    </div>
  );
}

export default Home;
