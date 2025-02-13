// src/App.jsx
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import HomePage from "./Components/HomePage/HomePage";

// Импортируем страницы, убедитесь, что путь верный:
import CategoriesPage from "./Components/Pages/CategoriesPage";
import CategoryProductsPage from "./Components/Pages/CategoryProductsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <div className="container">
          <Header />

          <Routes>
            {/* Главная */}
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:id" element={<CategoryProductsPage />} />

            {/*
              компоненты для страницы /products и /sales:
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/sales" element={<SalesPage />} />
            */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
