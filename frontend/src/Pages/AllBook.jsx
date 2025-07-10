import React, { useEffect, useState } from 'react';
import blog from '../assets/blog.json';
import Card from '../Components/Card';
import axios from 'axios';
function AllBook() {
  const [book, setBook] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const genres = ['business', 'books', 'marketing', 'horror', 'fiction','adventure'];
  const authors = ['Author 1', 'Author 2', 'Author 3', 'Author 4'];

  useEffect(() => {
  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/book/get-all-books');
      setBook(res.data);
      setFilteredBooks(res.data.bookArray);
      console.log(res.data.bookArray);
    } catch (err) {
      console.log(err);
    }
  };

  fetchBooks();
}, []);

  const handleFilterChange = () => {
    const filtered = book.filter((val) => {
      return (
        (selectedGenre ? val.category === selectedGenre : true) &&
        // (selectedAuthor ? val.author === selectedAuthor : true) &&
        (val.newPrice >= minPrice && val.newPrice <= maxPrice)
      );
    });
    setFilteredBooks(filtered);
    console.log(filtered);
  };

  return (
    <div className="flex flex-col md:flex-row p-6 gap-10">
      {/* Sidebar */}
      <div className=" p-4 bg-white rounded-lg md:w-1/6 shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Filters</h2>

        {/* Genre Filter */}
        <div className="mb-4">
          <label className="text-gray-700">Genre</label>
          <select
            className="p-2 border rounded-md w-full"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Author Filter */}
        {/* <div className="mb-4">
          <label className="text-gray-700">Author</label>
          <select
            className="p-2 border rounded-md w-full"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">All Authors</option>
            {authors.map((author, index) => (
              <option key={index} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div> */}

        {/* Price Filter */}
        <div className="mb-4">
          <label className="text-gray-700">Price Range</label>
          <div className="flex space-x-4">
            <input
              type="number"
              className="p-2 border rounded-md w-1/2"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              placeholder="Min"
            />
            <input
              type="number"
              className="p-2 border rounded-md w-1/2"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              placeholder="Max"
            />
          </div>
        </div>

        <button
          onClick={handleFilterChange}
          className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>

      {/* Book Cards */}
      <div className='w-full md:w-5/6'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-h-[80vh] overflow-auto">
        {filteredBooks.length === 0 ? (
          <div className="col-span-full text-center text-xl text-gray-500">No books found</div>
        ) : (
          filteredBooks.map((val, index) => (
            <Card key={index} val={val} />
          ))
        )}
      </div>
      </div>
    </div>
  );
}

export default AllBook;
