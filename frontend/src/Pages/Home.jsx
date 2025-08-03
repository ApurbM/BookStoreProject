import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner';
import BookC from '../Components/BookC';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../Redux/cartSlice';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Home() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


function QuestionBox({ question, answer, askedBy }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-all cursor-pointer bg-gray-50"
      onClick={() => setShow(!show)}
    >
      <div className="flex justify-between items-center">
        <p className="font-medium text-gray-800">Q: {question}</p>
        <span className="text-xs text-gray-400">– {askedBy}</span>
      </div>

      {show && (
        <p className="mt-3 text-sm text-gray-600 bg-white p-2 rounded border border-pink-100">
          <span className="text-pink-600 font-semibold">Answer: </span>{answer}
        </p>
      )}
    </div>
  );
}

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get('https://bookstoreproject-yg34.onrender.com/api/user/auth-check', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.data.authenticated) {
          navigate('/login');
        }
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    };

    checkAuth();

    if (user?.CurrentUser?._id) {
      dispatch(fetchCart(user.CurrentUser._id));
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, dispatch, user?.CurrentUser?._id]);

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

{/* ❓ Customer Questions */}
<div className="px-6 py-10 my-5 mx-4 mb-8 bg-white rounded shadow">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">❓ Customer Questions</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[
      {
        question: "Is 'Rich Dad Poor Dad' suitable for beginners?",
        answer: "Yes, it's written in simple language and great for financial literacy starters.",
        askedBy: "Meera"
      },
      {
        question: "Do you offer cash on delivery?",
        answer: "Yes, we provide COD service in most cities across India.",
        askedBy: "Ravi"
      },
      {
        question: "How long does delivery take?",
        answer: "Usually 3–5 business days depending on your location.",
        askedBy: "Kriti"
      },
      {
        question: "Can I return a book if damaged?",
        answer: "Yes, we offer a 7-day easy return policy for damaged or wrong items.",
        askedBy: "Ankit"
      }
    ].map((q, idx) => (
      <QuestionBox key={idx} question={q.question} answer={q.answer} askedBy={q.askedBy} />
    ))}
  </div>
</div>

      {/* 🧠 Quote of the Day */}
      <div className="px-6 py-8 bg-pink-50 rounded mx-4 shadow">
        <blockquote className="text-center italic text-pink-800 text-lg">
          “A reader lives a thousand lives before he dies... The man who never reads lives only one.”
        </blockquote>
        <p className="text-center text-sm mt-2 text-gray-600">– George R.R. Martin</p>
      </div>

    
{/* 👥 Customer Reviews Styled Section */}
<div className="px-6 py-10 bg-white rounded shadow mx-4 mb-10">
  <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Customer Reviews</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      {
        name: "John Evans",
        review:
          "Really happy with my blinds. They fit perfectly and the fabric chosen looks great. I recommended 2 blinds to a family member who has now placed an order herself!",
        stars: 5,
      },
      {
        name: "Sarah Nichols",
        review:
          "Thanks you did a great job for us and would be happy to use you again in the future.",
        stars: 5,
      },
      {
        name: "Michael Elson",
        review:
          "Very competitive prices and quality workmanship on the finished products, can highly recommend.",
        stars: 5,
      },
      {
        name: "Bruce Duncan",
        review:
          "The price, customer service and regular communication about my blind was first class.",
        stars: 5,
      },
      {
        name: "Susan Schultz",
        review:
          "Love these guys!!! Have used them for years on 5 different properties. Always quick, efficient, great service AND great value.",
        stars: 5,
      },
      {
        name: "Judy Mitchell",
        review:
          "Great service, prompt delivery and perfect fit, highly recommend. I have used them before and definitely again.",
        stars: 5,
      },
    ].map((review, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-pink-600">
            {review.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{review.name}</p>
            <span className="text-sm text-green-500">✔ Verified Buyer</span>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-3">“{review.review}”</p>
        <div className="flex gap-1">
          {[...Array(review.stars)].map((_, i) => (
            <span key={i} className="text-orange-400 text-sm">★</span>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>
 
    </div>
  );
}

export default Home;
