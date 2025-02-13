import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./CategoriesPage.module.css";
import ProductCard from "../ProductCard/ProductCard";

const CategoryProductsPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  const [sortType, setSortType] = useState("default");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });

  useEffect(() => {
    axios
      .get(`http://localhost:3333/categories/${id}`)
      .then((response) => {
        console.log("ОТВЕТ API (CategoryProductsPage):", response.data);
        if (response.data && response.data.category && Array.isArray(response.data.data)) {
          setCategory(response.data.category);
          setProducts(response.data.data);
        } else {
          console.error("Ошибка: API вернул неверный формат:", response.data);
        }
      })
      .catch((error) => console.error("Ошибка загрузки товаров:", error));
  }, [id]);

  // ---- Фильтр по цене ----
  const filteredProducts = products.filter((product) => {
    const minPrice = priceFilter.min ? Number(priceFilter.min) : 0;
    const maxPrice = priceFilter.max ? Number(priceFilter.max) : Infinity;
    return product.price >= minPrice && product.price <= maxPrice;
  });

  // ---- Сортировка ----
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === "price") {
      return a.price - b.price;
    }
    if (sortType === "discount") {
      const discountA = (a.oldPrice ?? a.price) - a.price;
      const discountB = (b.oldPrice ?? b.price) - b.price;
      return discountB - discountA;
    }
    return 0; // default
  });

  return (
    <div className={styles.container}>
      {/* Заголовок категории (картинка + title) */}
      {category && (
        <div style={{ marginBottom: "20px" }}>
          <img
            src={`http://localhost:3333${category.image}`}
            alt={category.title}
            style={{
              width: "100%",
              maxHeight: 300,
              objectFit: "cover",
              borderRadius: "1rem",
            }}
          />
          <h2 className={styles.categoryTitle}>{category.title}</h2>
        </div>
      )}

      {/* Блок фильтра и сортировки */}
      <div className={styles.controls}>
        <div className={styles.filterSort}>
          <label>Price:</label>
          <input
            type="number"
            placeholder="From"
            value={priceFilter.min}
            onChange={(e) =>
              setPriceFilter({ ...priceFilter, min: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="To"
            value={priceFilter.max}
            onChange={(e) =>
              setPriceFilter({ ...priceFilter, max: e.target.value })
            }
          />

          <label>Sort by:</label>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price">Price</option>
            <option value="discount">Discount</option>
          </select>
        </div>
      </div>

      {/* Сетка товаров */}
      <div className={styles.productsList}>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => {
            const itemForCard = {
              id: product.id,
              image: product.image,
              title: product.title,
              // Если есть oldPrice, значит показываем её как «обычную»:
              price: product.oldPrice || product.price,
              // «Скидочная» цена = product.price (только если есть oldPrice)
              discont_price: product.oldPrice ? product.price : null,
            };
            return <ProductCard key={product.id} item={itemForCard} />;
          })
        ) : (
          <p className={styles.noProducts}>No products found</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
