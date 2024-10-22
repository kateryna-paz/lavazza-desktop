import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebaseConfig";
import { ref, get } from "firebase/database";

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "menu/fetchCategories",
  async () => {
    try {
      const menuref = ref(db, "coffee-shop/menu");
      const snapshot = await get(menuref);

      if (snapshot.exists()) {
        const data = snapshot.val();

        const categories = Object.entries(data).map(([key, value]) => ({
          name: key,
          imageUrl: value["image-url"],
          subtitle: value.subtitle,
        }));
        return categories;
      } else {
        return "No data available at the specified path.";
      }
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }
);

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;
