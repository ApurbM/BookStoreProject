import React, { useState } from 'react';
import { Slack, Search, ShoppingCart, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import avatar from '../assets/avatar.png';
import { signOutSuccess,signOutFailure,signOutStart } from '../Redux/userslice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
const menu = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/", name: "Profile" },
  { path: "/", name: "Logout" }
];


function Navbar() {
  const user = useSelector((state)=>state.user);
  const {items} = useSelector((state)=>state.cart);
  console.log(items);
  const [toShow, setToShow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
   const dispatch = useDispatch();
  const handleToggle = () => setToShow(!toShow);
  const handleNavigation = () =>{
     navigate('/allBook')
       setMobileMenuOpen(false);
  }
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

async function handleLogout() {
  try {
    dispatch(signOutStart());

    const res = await axios.put(
      "http://localhost:3000/api/user/logout",
      {},
      { withCredentials: true }
    );

    if (res.data.success === false) {
      dispatch(signOutFailure(res.data.message));
      toast.error(res.data.message);
      return;
    }

    dispatch(signOutSuccess());
    toast.success("Logout successful");
    navigate("/login");
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.message || "Logout failed. Try again.");
    dispatch(signOutFailure(err.response?.data?.message || "Logout error"));
  } finally {
    setMobileMenuOpen(false);
  }
}

return (
    <>
      <header className="bg-pink-200 shadow-md px-4 py-3 flex items-center justify-between">
        {/* Logo + Search */}
        <div className="flex items-center gap-3">
          <Slack size={34} color="red" />
          <div className="relative w-full max-w-[10rem] sm:max-w-xs md:max-w-md lg:max-w-lg">
  <input
    type="text"
    placeholder="Enter book name"
    className="bg-gray-100 w-full px-4 py-2 rounded-full outline-none shadow-sm text-sm sm:text-base"
  />
  <Search size={20} color="blue" className="absolute right-3 top-2.5" />
</div>

                  </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4">
          <button onClick={handleNavigation} className="bg-amber-300 px-4 py-1 text-red-800 rounded-full hover:bg-amber-400 transition">All Books</button>
          
          <button onClick={() => navigate('/signIn')} className={`bg-blue-300 ${user.CurrentUser!==null && 'hidden'} px-4 py-1 text-white rounded-full hover:bg-blue-400 transition`}>Sign In</button>
          
        {user.CurrentUser!==null && <button onClick={handleLogout} className="bg-pink-400 px-4 py-1 text-white rounded-full hover:bg-pink-500 transition">Logout</button>}
          
          {user.CurrentUser!==null && <Link to="/order" className="flex items-center bg-yellow-400 px-4 py-1 rounded-full hover:bg-yellow-500 transition">
            <ShoppingCart size={20} color="black" />
            <span className="ml-1">{items.length}</span>
          </Link>}
          
        {user?.CurrentUser && <div className="relative">
            <button onClick={handleToggle}>
              <img src={avatar} alt="User Avatar" className="h-10 w-10 rounded-full border" />
            </button>

            {toShow && (
              <ul className="absolute right-0 mt-2 bg-white shadow-md rounded-lg z-50 w-36">
                {menu.map((val, index) => (
                  <li key={index} onClick={handleToggle}>
                    <Link to={val.path} className="block px-4 py-2 hover:bg-amber-300 transition">{val.name}</Link>
                  </li>
                ))}
              </ul>
            )}

          </div>}
        </div>

        {/* Mobile hamburger icon */}
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMobileMenu}>
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
      <div className="sm:hidden flex flex-col gap-1 bg-white px-4 py-3 border-t border-gray-200 shadow">
      <span 
        onClick={handleNavigation} 
        className="text-gray-800 hover:text-blue-600 cursor-pointer py-2 border-b"
      >
        All Books
      </span>
      <span 
        onClick={() => navigate('/signIn')} 
        className="text-gray-800 hover:text-blue-600 cursor-pointer py-2 border-b"
      >
        Sign In
      </span>
      <span 
        onClick={handleLogout} 
        className="text-gray-800 hover:text-blue-600 cursor-pointer py-2 border-b"
      >
        Log Out
      </span>
      <Link 
        to="/" 
        className="flex items-center justify-between py-2 text-gray-800 hover:text-blue-600 border-b"
      >
        <div className="flex items-center gap-2">
          <ShoppingCart size={18} />
          <span>Cart</span>
        </div>
        <span className="text-sm bg-gray-200 px-2 py-0.5 rounded-full">0</span>
      </Link>
    </div>
     )}
    </>
  );
}

export default Navbar;
