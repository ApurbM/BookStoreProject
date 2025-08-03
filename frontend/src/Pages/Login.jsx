import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'; // Fixed import
import axios from 'axios';
import { signInFailure, signInStart, signInSuccess } from '../Redux/userslice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!Email) return setError('Please enter your email');
    if (!Password) return setError('Please enter your password');
    setError('');
    dispatch(signInStart());

    try {
      const res = await axios.post(
        "https://bookstoreproject-yg34.onrender.com/api/user/login",
        // "http://localhost:3000/api/user/login",
        { email: Email, password: Password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res?.data?.success === false) {
        dispatch(signInFailure(res.data.message));
        setError(res?.data?.message || "Login failed");
        return;
      }

      const { token, user } = res.data;

      // ✅ Save token to localStorage
      localStorage.setItem("token", token);

      // ✅ Save user to redux
      dispatch(signInSuccess(user));

      toast.success('Login successful');

      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      dispatch(signInFailure("Something went wrong"));
      setError("Server error. Please try again later.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Log-In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="example@domain.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md"
            >
              LOGIN
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{' '}
            <Link to="/signIn" className="text-indigo-600 hover:underline cursor-pointer">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
