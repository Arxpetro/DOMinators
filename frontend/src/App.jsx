import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import HomePage from "./Components/HomePage/HomePage";
import CategoriesPage from "./Components/Pages/CategoriesPage";
import CategoryProductsPage from "./Components/Pages/CategoryProductsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:id" element={<CategoryProductsPage />} />
            <Route path="/products" element={<CategoryProductsPage />} />
          </Routes>
          {/* Footer */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
