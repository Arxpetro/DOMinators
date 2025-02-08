import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Map from "./Components/Map/Map";
import Categories from "./Components/Categories/Categories";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/categories" element={<Categories />} />
          
        </Routes>
        <Footer />
        <Categories /> 
         
      </div>
    </Router>
  );
}

export default App;