import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = 'https://bookstoreproject-yg34.onrender.com/api/cart';
// const baseURL = 'http://localhost:3000/api/cart';

// 🔐 Token header helper
const getTokenHeader = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// ✅ FETCH cart: only needs userid in headers
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userid, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseURL}/get-cart`, {
        headers: {
          ...getTokenHeader(),
          userid, // ✅ passed in headers
        },
      });
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Server error');
    }
  }
);

// ✅ ADD to cart: needs userid + bookid in headers
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ book, userid }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${baseURL}/insert-cart`,
        {}, // no body needed
        {
          headers: {
            ...getTokenHeader(),
            userid,
            bookid: book._id,
          },
        }
      );
      if (res.data.success === false) {
        toast.error(res.data.message);
        return rejectWithValue(res.data.message);
      }
      toast.success('Book added to cart');
      return book;
    } catch (err) {
      toast.error('Failed to add book');
      return rejectWithValue(err.response?.data || 'Server error');
    }
  }
);

// ✅ REMOVE from cart: needs userid + bookid in headers
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ book, userid }, { rejectWithValue }) => {
    try {
     const bookid = book._id;
      const res = await axios.put(
        `${baseURL}/remove-cart`,
        {}, // no body
        {
          headers: {
            ...getTokenHeader(),
            bookid,
            userid,
          },
        }
      );
      toast.success('Book removed from cart');
      return bookid;
    } catch (err) {
      toast.error('Failed to remove book');
      return rejectWithValue(err.response?.data || 'Server error');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: true,
    error: null,
    isF: false,
  },
  reducers: {
    clearCart(state) {
      state.items = [];
      state.loading = true;
      state.error = null;
      state.isF = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.isF = true;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.items.push(action.payload);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
