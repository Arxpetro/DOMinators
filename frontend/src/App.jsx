// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import HomePage from "./Components/HomePage/HomePage";
import ProductsCategories from "./Components/ProductsCategories/ProductsCategories";
import CategoriesPage from "./Components/Categories/CategoriesPage";
import CategoryProductsPage from "./Components/Categories/CategoryProductsPage";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:id" element={<CategoryProductsPage />} />
        <Route path="/categories" element={<ProductsCategories />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
