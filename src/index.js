import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import productReducer from "./features/productsSlice";
import { fetchProducts } from './ProductSlice';

const store = configureStore({
  reducer:{
    products: productReducer
  },
});

store.dispatch(fetchProducts())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
