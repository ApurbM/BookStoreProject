import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://bookstoreproject-yg34.onrender.com/api/order/getAllOrder", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }
      setOrders(res.data.orderArray);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.put(
        "https://bookstoreproject-yg34.onrender.com/api/order/editStatus",
        {
          newStatus: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            orderid:orderId
          },
        }
      );

      if (res.data.success) {
        toast.success("Status updated successfully");
           fetchOrders();   
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status.");
    }
  };

  const statusOptions = ["processing", "shipped", "delivered", "cancelled"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">📦 All Orders</h2>

      <div className="space-y-4 max-h-[80vh] overflow-y-auto">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-lg shadow flex flex-col gap-2 border-l-4 border-indigo-500"
            >
              <div className="text-lg font-semibold text-indigo-700">
                Payment ID: {order.razorpay_payment_id}
              </div>
              <div className="text-sm text-gray-700">Order ID: {order.razorpay_order_id}</div>
              <div className="text-sm text-gray-700">User ID: {order.user}</div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <p>
                  <span className="font-semibold">Billing Email:</span> {order.billingEmail}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {order.billingPhone}
                </p>
                <p>
                  <span className="font-semibold">Payment Method:</span> {order.paymentMethod}
                </p>
                <p>
                  <span className="font-semibold">Delivery Status:</span> {order.deliveryStatus}
                </p>
                <p>
                  <span className="font-semibold">Total Price:</span> ₹{order.price}
                </p>
                <p>
                  <span className="font-semibold">Total Books:</span>{" "}
                  {order.book?.length || 0}
                </p>
              </div>

              <div className="text-sm text-gray-600">
                <span className="font-medium">Paid At:</span>{" "}
                {new Date(order.paidAt).toLocaleString()}
              </div>

              {/* 🔁 Status dropdown */}
              <div className="mt-2">
                <label className="block text-sm font-medium mb-1">Update Status:</label>
                <select
                  value={order.deliveryStatus}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="p-2 border rounded"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
