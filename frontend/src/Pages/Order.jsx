import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart } from '../Redux/cartSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Order() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);
  const userid = useSelector((state) => state.user.CurrentUser.rest._id);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (userid && items.length === 0) {
      dispatch(fetchCart(userid));
    }
  }, [dispatch, userid]);

  const handleRemove = (book) => {
    dispatch(removeFromCart({ book, userid }));
  };

  const totalCost = items.reduce((acc, item) => acc + item.newPrice, 0);

  const handlePayment = async () => {
    setPaying(true);
    try {
      const { data: orderData } = await axios.post(
        'http://localhost:3000/api/payment/create-order',
        { amount: totalCost * 100 }, // in paisa
        { withCredentials: true }
      );

      const options = {
        key: 'rzp_test_zvpR59rH7tEjOl', // replace with your public key
        amount: orderData.amount,
        currency: 'INR',
        name: 'Bookstore',
        description: 'Payment for books',
        order_id: orderData.id,
        handler: async function (response) {
          try {
            const { data: verifyData } = await axios.post(
              'http://localhost:3000/api/payment/verify',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            if (verifyData.success) {
              alert('✅ Payment successful!');
              // Optional: Clear cart, redirect to success page, etc.
            } else {
              alert('❌ Payment verification failed');
            }
          } catch (err) {
            console.error(err);
            alert('Error verifying payment.');
          }
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment initiation failed:', err);
      alert('❌ Payment failed to start');
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#222] tracking-wide">
        🧾 Your Orders
      </h2>

      {loading ? (
        <div className="text-center text-gray-600 text-lg">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">Your cart is empty 😔</div>
      ) : (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-md shadow-md">
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between py-6 hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={`http://localhost:3000/uploads/${item.coverImage}`}
                    alt={item.title}
                    className="w-20 h-28 object-cover rounded border"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.title}</h3>
                    <div className="flex gap-2 items-center">
                      <p className="text-md font-semibold text-[#e53935]">₹{item.newPrice}</p>
                      <p className="text-sm text-gray-400 line-through">₹{item.oldPrice}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 capitalize">{item.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item)}
                  className="text-sm font-medium text-[#e53935] border border-[#e53935] px-4 py-1 rounded hover:bg-[#e53935] hover:text-white transition-all"
                >
                  REMOVE
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-8">
            <p className="text-2xl font-bold text-gray-800">Total: ₹{totalCost}</p>
            <button
              onClick={handlePayment}
              disabled={paying}
              className="bg-green-600 text-white px-6 py-2 rounded-md text-lg hover:bg-green-700 transition-all disabled:opacity-50"
            >
              {paying ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
