import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Navbar from "./components/Navbar";
import About from "./containers/About/About";
import Home from "./containers/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={Home} />
          <Route path="/about" element={About} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
