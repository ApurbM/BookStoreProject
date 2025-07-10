import React, { useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { signInFailure , signInStart , signInSuccess } from '../Redux/userslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
// import user from '../../../backend/Models/user';
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
    //api
    dispatch(signInStart());
  try{
    
    const res = await axios.post("http://localhost:3000/api/user/login",{
       email:Email,
       password:Password   
    },
  {
    withCredentials:true
  })
   if(res?.data?.success === false){
       dispatch(signInFailure(res.data.message))
       setError(res?.data?.message || "Login failed");
   }
   dispatch(signInSuccess(res.data));
   toast.success('Login successfull');
   if(res?.data?.rest?.role==='user'){
    navigate('/');
   }
   else{
     navigate('/admin');
   }

  }
  catch(err){
    console.log(err);
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
            Don't have an account? 
            <Link to={'/signIn'}>
            <span className="text-indigo-600 hover:underline cursor-pointer">Sign up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
