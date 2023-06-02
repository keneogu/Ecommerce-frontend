import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Cart from "./containers/Cart/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Home from "./containers/Home/Home";
import ProductDetail from "./containers/ProductDetail";
import Login from "./containers/User/Login";
import Register from "./containers/User/Register";
import { loadUser } from "./features/UserSlice";
import { store } from "./store";
import UserProfile from "./containers/User/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import UserUpdateProfile from "./containers/User/UserUpdateProfile";
import UserUpdatePassword from "./containers/User/UserUpdatePassword";
import ForgotPassword from "./containers/User/ForgotPassword";
import NewPassword from "./containers/User/NewPassword";
import Shipping from "./containers/Cart/Shipping";
import ConfirmOrder from "./containers/Cart/ConfirmOrder";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./containers/Cart/Payment";
import Orders from "./containers/Order/Orders";
import OrderDetails from "./containers/Order/OrderDetails";
import Layout from "./admin/shared/Layout";
import Dashboard from "./admin/Dashboard";
import AdminProductsList from "./admin/AdminProductsList";
import NewProduct from "./admin/NewProduct";
import UpdateProduct from "./admin/UpdateProduct";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeApi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);

  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/search/:search" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/me" element={<UserProfile />} exact />
            <Route path="/me/update" element={<UserUpdateProfile />} />
            <Route
              path="/me/password/update"
              element={<UserUpdatePassword />}
            />
            <Route path="/me/password/forgot" element={<ForgotPassword />} />
            <Route path="/me/password/reset/:token" element={<NewPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/orders/me" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            {stripeApiKey && (
              <Route
                path="/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}
            <Route path="/admin" isAdmin={true} element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/admin/products" element={<AdminProductsList />} />
              <Route path="/admin/product" element={<NewProduct />} />
              <Route path="/admin/product/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/notfound" replace />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
