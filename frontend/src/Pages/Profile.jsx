import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const user = useSelector((state) => state.user.CurrentUser);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/order/getOrderById", {
        headers: {
          Authorization: `Bearer ${token}`,
          userid: user._id,
        },
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      setOrders(res.data.orderArray);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchOrders();
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={user?.profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-pink-500 object-cover"
          />
          <div className="w-full">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">👤 Profile Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <p><span className="font-semibold text-gray-900">Username:</span> {user?.username}</p>
              <p><span className="font-semibold text-gray-900">Email:</span> {user?.email}</p>
              <p><span className="font-semibold text-gray-900">Role:</span> {user?.role}</p>
              <p><span className="font-semibold text-gray-900">User ID:</span> {user?._id}</p>
              <p className="sm:col-span-2"><span className="font-semibold text-gray-900">Address:</span> {user?.address || "Not Provided"}</p>
              <p><span className="font-semibold text-gray-900">Created At:</span> {new Date(user?.createdAt).toLocaleString()}</p>
              <p><span className="font-semibold text-gray-900">Last Updated:</span> {new Date(user?.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div>
          <h3 className="text-2xl font-semibold text-pink-600 mb-4 border-b pb-2">🛍️ Order History</h3>

          <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
            {orders.length === 0 ? (
              <div className="text-center text-gray-500 bg-white py-6 rounded shadow">
                No orders found.
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-4 rounded-md shadow hover:shadow-lg transition border border-gray-200"
                >
                  <div className="flex flex-wrap justify-between items-center mb-2">
                    <div className="text-sm sm:text-base font-medium text-gray-800">
                      <span className="text-pink-600">Order ID:</span> {order.razorpay_order_id}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {new Date(order.paidAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2 text-sm sm:text-base text-gray-700">
                    <p>
                      <span className="font-medium text-gray-900">Payment ID:</span>{" "}
                      {order.razorpay_payment_id}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Books Ordered:</span>{" "}
                      {order.book?.length || 0}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Total Amount:</span> ₹{order.price}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Delivery Status:</span>{" "}
                      <span
                        className={`px-2 py-1 rounded text-white capitalize ${
                          order.deliveryStatus === "delivered"
                            ? "bg-green-500"
                            : order.deliveryStatus === "cancelled"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {order.deliveryStatus}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
