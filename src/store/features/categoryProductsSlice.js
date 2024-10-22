import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebaseConfig";
import { ref, get } from "firebase/database";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "categoryProducts/fetchProducts",

  async (category) => {
    try {
      const productsRef = ref(db, `coffee-shop/menu/${category}/products`);
      const snapshot = await get(productsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const products = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        return products;
      } else {
        return "No data available at the specified path.";
      }
    } catch (err) {
      throw new Error(`Error fetching products: ${err.message}`);
    }
  }
);

export const categoryProductsSlice = createSlice({
  name: "categoryProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default categoryProductsSlice.reducer;
