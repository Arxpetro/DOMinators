import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./CategoryProductsPage.module.css";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/categories/all")
      .then((response) => {
        console.log("Категории:", response.data);
        setCategories(response.data);
      })
      .catch((error) => console.error("Ошибка загрузки категорий:", error));
  }, []);

  return (
    <div className={styles.container}>
      <h2>Категории товаров</h2>
      <div className={styles.categoriesList}>
        {categories.map((category) => (
          <Link to={`/categories/${category.id}`} key={category.id} className={styles.categoryCard}>
            <img src={`http://localhost:3333${category.image}`} alt={category.name} />
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
