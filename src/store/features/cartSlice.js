import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebaseConfig";
import { ref, set, push } from "firebase/database";
import { storage } from "../../firebase/firebaseConfig";
import {
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";

const initialState = {
  cartItems: [],
  sum: 0,
  email: "",
  error: null,
  isLoading: false,
};

const calcSum = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export const saveOrder = createAsyncThunk(
  "cart/saveOrder",
  async (cartData, { rejectWithValue }) => {
    const { email, cartItems, sum } = cartData;

    if (sum === 0) {
      return rejectWithValue("Cart is empty");
    }

    try {
      let querySnapshot;

      if (email !== "") {
        const usersRef = collection(storage, "users");
        const q = query(usersRef, where("email", "==", email));
        querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("User not found");
          return rejectWithValue("User not found");
        }
      }

      const ordersRef = ref(db, "coffee-shop/orders");
      const newOrderRef = push(ordersRef);
      const orderId = newOrderRef.key;

      console.log("New Order ID:", orderId);
      await set(newOrderRef, {
        cartItems,
        sum,
        email,
        date: new Date().toISOString(),
      });

      console.log("Order saved successfully with ID:", orderId);

      if (email !== "" && querySnapshot) {
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;

        const userRef = doc(storage, "users", userId);
        await updateDoc(userRef, {
          orderIds: arrayUnion(orderId),
        });
      }

      return orderId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.name + cartItem.size === item.name + item.size
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
      state.sum = calcSum(state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (_, index) => index !== action.payload
      );
      state.sum = calcSum(state.cartItems);
    },
    updateQuantity: (state, action) => {
      const { index, newQuantity } = action.payload;
      if (state.cartItems[index]) {
        state.cartItems[index].quantity = newQuantity;
      }
      state.sum = calcSum(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.sum = 0;
      state.email = "";
    },
    setCart: (state, action) => {
      state.cartItems = action.payload;
      state.sum = calcSum(state.cartItems);
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveOrder.fulfilled, (state) => {
        state.isLoading = false;
        console.log("Order saved successfully.");
      })
      .addCase(saveOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to save order.";
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCart,
  setEmail,
} = cartSlice.actions;

export default cartSlice.reducer;
