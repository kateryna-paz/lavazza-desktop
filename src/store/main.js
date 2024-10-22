import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./features/menuSlice";
import categoryProductsReducer from "./features/categoryProductsSlice";
import registerReducer from "../auth/registerReducer";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";
import orderHistoryReducer from "./features/orderHistorySlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    categoryProducts: categoryProductsReducer,
    register: registerReducer,
    auth: authReducer,
    cart: cartReducer,
    orderHistory: orderHistoryReducer,
  },
});

export default store;
