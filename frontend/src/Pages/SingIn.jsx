import React, { useState } from 'react';
import { Link } from 'react-router'; // ✅ fixed import
import { useNavigate } from 'react-router'; // ✅ fixed import
import { toast } from 'react-toastify';
import axios from 'axios';

function SignIn() {
  const [User, setUser] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!User) return setError('Please enter your username');
    if (!Email) return setError('Please enter your email');
    if (!Password) return setError('Please enter your password');
    if (!Address) return setError('Please enter your address');
    setError('');

    try {
      const res = await axios.post(
        "https://bookstoreproject-yg34.onrender.com/api/user/register",
        // "http://localhost:3000/api/user/register",
        {
          username: User,
          email: Email,
          address: Address,
          password: Password
        }
        // ❌ no need for withCredentials here
      );

      if (res.data.success === false) {
        setError(res.data.message);
        return;
      }

      toast.success('User registered successfully');
      navigate('/login');
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-400 to-yellow-300 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Sign-Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={User}
              onChange={(e) => setUser(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="yourusername"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your full address"
              rows={3}
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md"
            >
              SIGN UP
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <Link to="/login">
              <span className="text-pink-600 hover:underline cursor-pointer">Log in</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
