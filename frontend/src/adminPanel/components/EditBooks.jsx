import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const EditBooks = () => {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchBook = async () => {
    try {
      const res = await axios.get("https://bookstoreproject-yg34.onrender.com/api/book/get-all-books");
      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }
      setBooks(res.data.bookArray);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const deleteBook = async (bookid) => {
    try {
      const res = await axios.delete("https://bookstoreproject-yg34.onrender.com/api/book/remove-book", {
        headers: {
          Authorization: `Bearer ${token}`,
          bookid: bookid,
        },
      });
      if (res.data.success == false) {
        toast.error(res.data.message);
        return;
      }
      toast.success("Book deleted successfully");
      fetchBook();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center border-b pb-4">
          📚 Manage Books
        </h2>

        <div className="max-h-[550px] overflow-y-auto space-y-5 pr-2">
          {books.length === 0 ? (
            <p className="text-gray-500 text-center">No books found.</p>
          ) : (
            books.map((book) => (
              <div
                key={book._id}
                className="flex items-center justify-between bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all"
              >
                {/* Book Cover */}
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-16 h-24 object-cover rounded-md border border-gray-200"
                />

                {/* Book Details */}
                <div className="flex-1 px-5">
                  <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="line-through text-red-500">₹{book.oldPrice}</span>
                    <span className="ml-2 text-green-600 font-semibold">₹{book.newPrice}</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() =>
                      navigate(`/admin/edit-book-info/${book._id}`, {
                        state: { book },
                      })
                    }
                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium text-sm px-4 py-2 rounded-md transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteBook(book._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium text-sm px-4 py-2 rounded-md transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBooks;
