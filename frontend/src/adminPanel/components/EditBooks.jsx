import React from "react";

const books = [
  { id: 1, title: "Atomic Habits", author: "James Clear", price: 299 },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho", price: 199 },
];

const EditBooks = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit / Remove Books</h2>
      <div className="space-y-4">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <p>{book.author} - ₹{book.price}</p>
            </div>
            <div className="space-x-2">
              <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditBooks;
