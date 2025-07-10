import React from 'react';
import bannerImage from '../assets/banner.png';
import { ReactTyped } from 'react-typed';

function Banner() {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-10 bg-gradient-to-r from-pink-100 to-blue-100">
      
      {/* Text Content */}
      <div className="text-center md:text-left md:w-1/2 space-y-7">
            
      <h1 className="text-xl sm:text-xl lg:text-3xl font-extrabold">
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
    <ReactTyped
      strings={["Here you can find anything"]}
      typeSpeed={40}
      backSpeed={50}
      loop
    />
  </span>
</h1>

        <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis maiores libero facere neque omnis quibusdam dicta hic reprehenderit. Aliquid, nulla eaque iusto corrupti similique numquam dignissimos voluptatibus.
        </p>

        <button className="bg-amber-400 hover:bg-amber-500 transition-all duration-300 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-xl">
          Subscribe
        </button>
      </div>

      {/* Image */}
      <div className="mb-8 md:mb-0 md:w-1/2 flex justify-center">
        <img
          src={bannerImage}
          alt="Banner"
          className="w-[80%] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl drop-shadow-xl"
        />
      </div>
    </div>
  );
}

export default Banner;
