import React, { useEffect, useState } from 'react';
import blog from '../assets/blog.json';
import Card from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../index.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const options = [
  { value: 'All' },
  { value: 'adventure' },
  { value: 'business' },
  { value: 'marketing' },
  { value: 'horror' },
  { value: 'fiction' },
  { value: 'books' }
];

const BookC = () => {
  const [book, setBook] = useState([]);
  const [filterBook, setFilterBook] = useState([]);

 useEffect(() => {
  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/book/get-all-books');
      setBook(res.data);
      setFilterBook(res.data.bookArray);
      console.log(res.data.bookArray);
 console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  fetchBooks();
}, []);

  function handleSelect(e) {
    const selected = e.target.value;
    setFilterBook(
      selected === 'All'
        ? book
        : book.filter((val) => val.category === selected)
    );
  }

  return (
    <div className="sm:px-16 px-4 sm:mt-20 mt-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Top Sellers</h1>

      <select
        onChange={handleSelect}
        className="bg-gray-100 border text-black px-3 py-1 rounded-md mb-6 shadow-sm focus:ring-2 focus:ring-blue-300"
      >
        {options.map((val, index) => (
          <option key={index} value={val.value}>
            {val.value.charAt(0).toUpperCase() + val.value.slice(1)}
          </option>
        ))}
      </select>

      <Swiper
        navigation={true}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={24}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          }
        }}
        className="pb-10"
      >
        {filterBook.map((val, index) => (
          <SwiperSlide key={index} className="px-2">
            <Card val={val} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookC;
