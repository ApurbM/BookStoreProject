import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
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
  const [error,setError] = useState("");
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
  
    if (book.title.trim() === "") {
      setError("Please enter title");
      return;
    }
    if (book.description.trim() === "") {
      setError("Please enter description");
      return;
    }
    if (book.category === "") {
      setError("Please select category");
      return;
    }
    if (!book.oldPrice || !book.newPrice || book.oldPrice <= 0 || book.newPrice <= 0) {
      setError("Enter valid price details");
      return;
    }
  
    setError("");
  
    try {
      const formData = new FormData();
      formData.append("title", book.title);
      formData.append("description", book.description);
      formData.append("category", book.category);
      formData.append("oldPrice", Number(book.oldPrice));
      formData.append("newPrice", Number(book.newPrice));
      formData.append("trending", book.trending);
  
      if (book.coverImage) {
        formData.append("coverImage", book.coverImage);
      }
  
      const res = await axios.post(
        "http://localhost:3000/api/book/post-book",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
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
    <div>
      <h2 className="text-3xl font-bold mb-6">📚 Add a New Book</h2>
      <form
        className="bg-white p-8 rounded-lg shadow max-w-2xl space-y-5"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            placeholder="The Giving Tree"
            value={book.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Enter book description"
            value={book.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded"
            
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={book.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="fiction">Fiction</option>
            <option value="education">Education</option>
            <option value="biography">Biography</option>
            <option value="romance">Romance</option>
            <option value="mystery">Mystery</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Old Price</label>
            <input
              type="number"
              name="oldPrice"
              value={book.oldPrice}
              onChange={handleChange}
              placeholder="34.99"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">New Price</label>
            <input
              type="number"
              name="newPrice"
              value={book.newPrice}
              onChange={handleChange}
              placeholder="24.99"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Cover Image</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
            className="bg-gray-300 border-2"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="trending"
            checked={book.trending}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium">Mark as Trending</label>
        </div>
         {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
