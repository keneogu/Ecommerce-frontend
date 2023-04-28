import { configureStore } from "@reduxjs/toolkit";
import productReducer, { fetchProducts } from "./features/ProductSlice";
import { productsApi } from './features/ProductApi';
import cartReducer, { getTotals} from './features/CartSlice';

export const store = configureStore({
  reducer:{
    products: productReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(fetchProducts())
store.dispatch(getTotals())