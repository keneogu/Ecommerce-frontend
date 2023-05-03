import React, { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import {useSearchParams } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Cart from "./containers/Cart/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Home from "./containers/Home/Home";
import ProductDetail from "./containers/ProductDetail";
import {SearchContext} from "./components/context/SearchContext";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
	const [search, setSearch] = useState(searchParams.get('search'));
  
  return (
    <div className="App">
      <SearchContext.Provider value={{search, setSearch, searchParams, setSearchParams}}>
        <ToastContainer />
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/search/:search" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/notfound" replace />} />
            </Routes>
              <Footer />
      </SearchContext.Provider>
    </div>
  );
}

export default App;
