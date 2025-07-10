import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo and description */}
        <div>
          <h2 className="text-2xl font-bold text-white">Book Haven</h2>
          <p className="mt-4 text-sm">
            Dive into a world of endless stories and knowledge. Your trusted bookstore.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Shop</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
          <p className="text-sm mb-4">Get the latest updates and offers.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="p-2 rounded-l bg-gray-800 border border-gray-700 focus:outline-none text-white w-full"
            />
            <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} Book Haven. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
