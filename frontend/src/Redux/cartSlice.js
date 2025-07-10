import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = 'https://bookstoreproject-yg34.onrender.com/api/cart';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userid, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: 'get',
        url: '/get-cart',
        baseURL,
        headers: { userid },
        withCredentials: true,
      });
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Server error");
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ book, userid }, { rejectWithValue }) => {
    try {
      const bookid = book._id;
      const res = await axios({
        method: 'put',
        url: '/insert-cart',
        baseURL,
        headers: { userid, bookid },
        withCredentials: true,
      });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return rejectWithValue(res.data.message);
      }
      toast.success("Book added successfully");
      return book;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Server error");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ book, userid }, { rejectWithValue }) => {
    try {
      const bookid = book._id;
      await axios({
        method: 'put',
        url: '/remove-cart',
        baseURL,
        headers: { bookid, userid },
        withCredentials: true,
      });
      toast.success("Book removed from cart");
      return bookid;
    } catch (err) {
      toast.error("Failed to remove book");
      return rejectWithValue(err.response?.data || "Server error");
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: true,
    error: null,
    isF: false
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
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
