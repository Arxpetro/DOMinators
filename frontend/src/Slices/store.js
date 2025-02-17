import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./AllProductsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});