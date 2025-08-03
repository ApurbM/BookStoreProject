import React from "react";
import { Outlet, useNavigate } from "react-router";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <button
            onClick={() => navigate("/admin/add-book")}
            className="block w-full text-left hover:bg-indigo-600 p-2 rounded"
          >
            Add Book
          </button>
          <button
            onClick={() => navigate("/admin/edit-book")}
            className="block w-full text-left hover:bg-indigo-600 p-2 rounded"
          >
            Edit/Remove Books
          </button>
          <button
            onClick={() => navigate("/admin/order")}
            className="block w-full text-left hover:bg-indigo-600 p-2 rounded"
          >
            All Orders
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
