import React, { useRef, useState } from 'react';
import bannerImage from '../assets/banner.png';
import { ReactTyped } from 'react-typed';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
// import required modules
import { EffectCards } from 'swiper/modules';

function Banner() {
  const imageUrl = "https://res.cloudinary.com/dusk0ozik/image/upload/v1752516756/uploads/gi3kv3f0z1h7p9iemagc.webp";
  
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
     
      {/* Swiper Cards */}
      <div className="mb-8 md:mb-0 md:w-1/2 flex justify-center items-center">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="w-70 h-100"
        >
          <SwiperSlide className="flex items-center justify-center rounded-2xl text-xl font-bold text-white bg-red-600 p-4">
            <img src={"https://res.cloudinary.com/dusk0ozik/image/upload/v1752517898/uploads/lwunknvcslmtrimi3s3z.webp"} alt="Slide 1" className="w-full h-full object-contain rounded-xl" />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center rounded-2xl text-xl font-bold text-white bg-blue-600 p-4">
            <img src={"https://res.cloudinary.com/dusk0ozik/image/upload/v1752517629/uploads/ghy1pw3pllatwwyk8yhn.jpg"} alt="Slide 2" className="w-full h-full object-contain rounded-xl" />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center rounded-2xl text-xl font-bold text-white bg-green-500 p-4">
            <img src={"https://res.cloudinary.com/dusk0ozik/image/upload/v1752519386/uploads/da5mr0fxbjmpoulni0pb.webp"} alt="Slide 3" className="w-full h-full object-contain rounded-xl" />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center rounded-2xl text-xl font-bold text-white bg-orange-600 p-4">
            <img src={"https://res.cloudinary.com/dusk0ozik/image/upload/v1752519478/uploads/tvwkwpqmv9x361geopts.jpg"} alt="Slide 4" className="w-full h-full object-contain rounded-xl" />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center rounded-2xl text-xl font-bold text-white bg-lime-600 p-4">
            <img src={"https://res.cloudinary.com/dusk0ozik/image/upload/v1752520088/uploads/cpmj4ywnwkkwkgzrqkrw.jpg"} alt="Slide 5" className="w-full h-full object-contain rounded-xl" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Banner;