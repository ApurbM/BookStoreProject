import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const EditBookInfo = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const book = state?.book;
  const navigate = useNavigate();
  const [updatedBook, setUpdatedBook] = useState({
    title: book?.title || "",
    description: book?.description || "",
    oldPrice: book?.oldPrice || "",
    newPrice: book?.newPrice || "",
  });

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7fafd]">
        <p className="text-red-500 text-lg font-medium">No book data available for editing</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook({ ...updatedBook, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:3000/api/book/update-book`,
        updatedBook,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            bookid:id
          },
        }
      );

      if (res?.data?.success) {
        toast.success("Book updated successfully");
        navigate('/admin/edit-book');
      } else {
        toast.error(res?.data?.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff] px-4 py-10">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          📚 Edit Book Details
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Book Title"
              value={updatedBook.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Book Description"
              value={updatedBook.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 h-full min-h-[100px]"
            />
          </div>

          <div>
            <input
              type="number"
              name="oldPrice"
              placeholder="Old Price"
              value={updatedBook.oldPrice}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <input
              type="number"
              name="newPrice"
              placeholder="New Price"
              value={updatedBook.newPrice}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300 shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* <ToastContainer position="top-right" /> */}
    </div>
  );
};

export default EditBookInfo;
