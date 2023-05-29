import { configureStore } from "@reduxjs/toolkit";
import productReducer, { fetchProducts } from "./features/ProductSlice";
import userReducer from "./features/UserSlice";
import orderReducer, {myOrders} from "./features/OrderSlice";
import { productsApi } from './features/ProductApi';
import cartReducer, { getTotals} from './features/CartSlice';
import adminReducer from './features/AdminSlice';

export const store = configureStore({
  reducer:{
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    admin: adminReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(fetchProducts())
store.dispatch(getTotals())
store.dispatch(myOrders())