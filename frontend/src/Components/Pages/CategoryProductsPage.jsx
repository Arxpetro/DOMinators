import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./CategoryProductsPage.module.css";

const CategoryProductsPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("default");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });

  // Загрузка данных
  useEffect(() => {
    axios
      .get(`http://localhost:3333/products?categoryId=${id}`)
      .then((response) => {
        console.log("Загруженные товары:", response.data);
        setProducts(response.data);
      })
      .catch((error) => console.error("Ошибка загрузки товаров:", error));
  }, [id]);

  // Фильтрация товаров по цене
  const filteredProducts = products.filter((product) => {
    const minPrice = priceFilter.min ? Number(priceFilter.min) : 0;
    const maxPrice = priceFilter.max ? Number(priceFilter.max) : Infinity;
    return product.price >= minPrice && product.price <= maxPrice;
  });

  // Сортировка товаров
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === "price") return a.price - b.price;
    if (sortType === "discount") {
      const discountA = a.oldPrice ? a.oldPrice - a.price : 0;
      const discountB = b.oldPrice ? b.oldPrice - b.price : 0;
      return discountB - discountA;
    }
    return 0;
  });

  return (
    <div className={styles.container}>
      {/* Заголовок */}
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

          <label>Discounted items</label>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="default">Default</option>
            <option value="price">Price</option>
            <option value="discount">Discount</option>
          </select>
        </div>
      </div>

      {/* Список товаров */}
      <div className={styles.productsList}>
        {sortedProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={`http://localhost:3333${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p className={styles.price}>
              ${product.price}
              {product.oldPrice && <span className={styles.oldPrice}>${product.oldPrice}</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
