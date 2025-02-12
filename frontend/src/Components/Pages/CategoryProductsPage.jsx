import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard"; 
import styles from "./CategoryProductsPage.module.css";

const CategoryProductsPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("default");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });

  console.log("Категория ID:", id); // Логируем ID категории

  useEffect(() => {
    axios
      .get(`http://localhost:3333/categories/${id}`)
      .then((response) => {
        console.log("Ответ от API:", response.data);
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error("Ошибка: API вернул неверный формат данных:", response.data);
        }
      })
      .catch((error) => console.error("Ошибка загрузки товаров:", error));
  }, [id]);

  // Фильтрация товаров по цене
  const filteredProducts = products.filter((product) => {
    const minPrice = priceFilter.min ? Number(priceFilter.min) : 0;
    const maxPrice = priceFilter.max ? Number(priceFilter.max) : Infinity;
    return product.price >= minPrice && product.price <= maxPrice;
  });

  console.log("Фильтрованные товары:", filteredProducts);

  // ✅ Сортировка товаров
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === "price") return a.price - b.price;
    if (sortType === "discount") {
      const discountA = (a.oldPrice ?? a.price) - a.price;
      const discountB = (b.oldPrice ?? b.price) - b.price;
      return discountB - discountA;
    }
    return 0;
  });

  console.log("Отсортированные товары:", sortedProducts);

  return (
    <div className={styles.container}>
      <h2 className={styles.categoryTitle}>Tools and Equipment</h2>

      {/* Фильтр и сортировка */}
      <div className={styles.controls}>
        <div className={styles.filterSort}>
          <label>Price:</label>
          <input
            type="number"
            placeholder="From"
            value={priceFilter.min}
            onChange={(e) => setPriceFilter({ ...priceFilter, min: e.target.value })}
          />
          <input
            type="number"
            placeholder="To"
            value={priceFilter.max}
            onChange={(e) => setPriceFilter({ ...priceFilter, max: e.target.value })}
          />

          <label>Sort by:</label>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="default">Default</option>
            <option value="price">Price</option>
            <option value="discount">Discount</option>
          </select>
        </div>
      </div>

      {/* Отображение товаров */}
      <div className={styles.productsList}>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))
        ) : (
          <p className={styles.noProducts}>No products found</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
