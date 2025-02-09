import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3333/categories")
      .then(response => setCategories(response.data))
      .catch(error => console.error("Ошибка загрузки категорий:", error));
  }, []);

  return (
    <div className="categories-container">
      <h2>Категории товаров</h2>
      <div className="categories-list">
        {categories.map(category => (
          <Link to={`/categories/${category.id}`} key={category.id} className="category-card">
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;