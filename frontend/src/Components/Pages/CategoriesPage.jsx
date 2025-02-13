import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./CategoriesPage.module.css";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/categories/all")
      .then((response) => {
        console.log("ОТВЕТ API (CategoriesPage):", response.data);
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error("Ошибка: API вернул некорректный формат:", response.data);
        }
      })
      .catch((error) => console.error("Ошибка загрузки категорий:", error));
  }, []);

  return (
    <div className={styles.container}>
      <h2>Категории товаров</h2>

      <div className={styles.categoriesList}>
        {categories.map((category) => (
          <Link
            to={`/categories/${category.id}`}
            key={category.id}
            className={styles.categoryCard}
          >
            {/*
              Вместо <img ...> делаем по аналогии с productImg:
              - div с inline-стилем backgroundImage
            */}
            <div
              className={styles.categoryCardImg}
              style={{
                backgroundImage: `url(http://localhost:3333${category.image})`,
              }}
            ></div>

            {/* Блок с названием категории, по аналогии с productInfo */}
            <div className={styles.categoryInfo}>
              <h3>{category.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
