import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebaseConfig";
import { ref, get } from "firebase/database";

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    const ordersref = ref(db, "coffee-shop/orders");
    const snapshot = await get(ordersref);

    if (snapshot.exists()) {
      const data = snapshot.val();

      const today = new Date().toISOString().split("T")[0];

      const orders = Object.entries(data)
        .map(([key, value]) => ({
          id: key,
          ...value,
        }))
        .filter((order) => {
          return order.date.split("T")[0] === today;
        });

      return orders;
    } else {
      return "No data available at the specified path.";
    }
  } catch (error) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }
});

export const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default orderHistorySlice.reducer;
