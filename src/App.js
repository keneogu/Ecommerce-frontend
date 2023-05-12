import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
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
          </Route>
          <Route path="/me/update" element={<UserUpdateProfile />} />
          <Route path="/me/password/update" element={<UserUpdatePassword />} />
          <Route path="/me/password/forgot" element={<ForgotPassword />} />
          <Route path="/me/password/reset/:token" element={<NewPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/notfound" replace />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
