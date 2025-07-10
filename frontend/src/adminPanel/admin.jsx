import React, { useState } from "react";
import AddBook from "./components/AddBook";
import EditBooks from "./components/EditBooks";
import Orders from "./components/Orders";

const Admin = () => {
  const [section, setSection] = useState("add");

  const renderSection = () => {
    switch (section) {
      case "add":
        return <AddBook />;
      case "edit":
        return <EditBooks />;
      case "orders":
        return <Orders />;
      default:
        return <AddBook />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <button onClick={() => setSection("add")} className="block w-full text-left hover:bg-indigo-600 p-2 rounded">Add Book</button>
          <button onClick={() => setSection("edit")} className="block w-full text-left hover:bg-indigo-600 p-2 rounded">Edit/Remove Books</button>
          <button onClick={() => setSection("orders")} className="block w-full text-left hover:bg-indigo-600 p-2 rounded">All Orders</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{renderSection()}</main>
    </div>
  );
};

export default Admin;
