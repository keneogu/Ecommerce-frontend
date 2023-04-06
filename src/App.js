import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import About from "./containers/About/About";
import Home from "./containers/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
