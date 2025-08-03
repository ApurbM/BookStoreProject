import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    category: "fiction",
    oldPrice: "",
    newPrice: "",
    trending: false,
    coverImage: null,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setBook({ ...book, [name]: checked });
    } else if (type === "file") {
      setBook({ ...book, coverImage: files[0] });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (book.title.trim() === "") return setError("Please enter title");
    if (book.description.trim() === "") return setError("Please enter description");
    if (!book.oldPrice || !book.newPrice || book.oldPrice <= 0 || book.newPrice <= 0) {
      return setError("Enter valid price details");
    }

    setError("");

    try {
      const formData = new FormData();
      Object.entries(book).forEach(([key, value]) => {
        if (key === "coverImage" && value) {
          formData.append("coverImage", value);
        } else {
          formData.append(key, value);
        }
      });

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://bookstoreproject-yg34.onrender.com/api/book/post-book",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.success === false) {
        toast.error(res?.data?.message || "Failed to add book");
        return;
      }

      toast.success("Book added successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbfc] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-10">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          📚 Add a New Book
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={book.title}
              onChange={handleChange}
              className="w-full border border-gray-200 px-4 py-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <textarea
              name="description"
              rows="4"
              placeholder="Description"
              value={book.description}
              onChange={handleChange}
              className="w-full border border-gray-200 px-4 py-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            ></textarea>

            <select
              name="category"
              value={book.category}
              onChange={handleChange}
              className="w-full border border-gray-200 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="fiction">Fiction</option>
              <option value="education">Education</option>
              <option value="biography">Biography</option>
              <option value="romance">Romance</option>
              <option value="mystery">Mystery</option>
            </select>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="trending"
                checked={book.trending}
                onChange={handleChange}
                className="h-4 w-4 text-teal-500"
              />
              <label className="text-sm text-gray-700">Mark as Trending</label>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <input
              type="number"
              name="oldPrice"
              placeholder="Old Price"
              value={book.oldPrice}
              onChange={handleChange}
              className="w-full border border-gray-200 px-4 py-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="number"
              name="newPrice"
              placeholder="New Price"
              value={book.newPrice}
              onChange={handleChange}
              className="w-full border border-gray-200 px-4 py-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-md text-sm text-gray-700"
            />
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          </div>

          {/* Submit Button Full Width */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-md transition shadow-md"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default AddBook;
