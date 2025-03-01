import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./CategoryProductPage.module.css"; 
import ProductCard from "../ProductCard/ProductCard"; // Используем ProductCard для отображения товаров
import { DiscountedProductsPage } from "../DiscountedProductsPage/DiscountedProductsPage"; // Именованный экспорт// Используем DiscountedProductsPage

const CategoryProductsPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  // Фильтры и сортировка
  const [sortType, setSortType] = useState("default");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/categories/${id}`)
      .then((response) => {
        console.log("API ответ (CategoryProductsPage):", response.data);
        if (response.data?.category && Array.isArray(response.data?.data)) {
          setCategory(response.data.category);
          setProducts(response.data.data);
        } else {
          console.error("Некорректный формат:", response.data);
        }
      })
      .catch((error) => console.error("Ошибка:", error));
  }, [id]);
 // Фильтрация по цене и скидке
 const filtered = products.filter((p) => {
  const min = priceFilter.min ? Number(priceFilter.min) : 0;
  const max = priceFilter.max ? Number(priceFilter.max) : Infinity;
  const meetsPrice = p.price >= min && p.price <= max;
  const meetsDiscount = onlyDiscounted ? p.oldPrice > p.price : true;
  return meetsPrice && meetsDiscount;
});

// Сортировка товаров
const sorted = [...filtered].sort((a, b) => {
  switch (sortType) {
    case "price-low":
      return a.price - b.price;
    case "price-high":
      return b.price - a.price;
    case "name-az":
      return a.title.localeCompare(b.title);
    case "name-za":
      return b.title.localeCompare(a.title);
    default:
      return 0;
  }
});

return (
  <div className={styles.container}>
    {/* Навигация */}
    {category?.title && (
      <nav className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbLink}>Main Page</Link> &gt; 
        <Link to="/categories" className={styles.breadcrumbLink}> Categories</Link> &gt; 
        <span className={styles.currentCategory}>{category.title}</span>
      </nav>
    )}

   {/* Заголовок категории */}
{category && <h2 className={styles.categoryTitle}>{category.title}</h2>}



    {/* Фильтры */}
    <div className={styles.filters}>
      <div className={styles.filterBlock}>
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
      </div>
      {/* Фильтр "Discounted Items" теперь после заголовка категории */}
<div className={styles.discountFilter}>
  <label>
    Discounted Items
    <input
      type="checkbox"
      checked={onlyDiscounted}
      onChange={() => setOnlyDiscounted(!onlyDiscounted)}
      className={styles.discountCheckbox}
    />
  </label>
</div>

      <div className={styles.filterBlock}>
        <label>Sorted:</label>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="default">By Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-az">Name A-Z</option>
            <option value="name-za">Name Z-A</option>
          </select>
        </div>
        
      </div>

      {/* Контейнер товаров (2 ряда по 4 товара) */}
      <div className={styles.productsContainer}>
        {sorted.length > 0 ? (
          sorted.slice(0, 8).map((product) => {
            // Передаём в ProductCard нужные поля
            const itemForCard = {
              id: product.id,
              image: product.image,
              title: product.title,
              price: product.oldPrice || product.price,
              discont_price: product.oldPrice ? product.price : null,
            };
            return <ProductCard key={product.id} item={itemForCard} />;
          })
        ) : (
          <p className={styles.noProducts}>No products found</p>
        )}
      </div>

      {/* Подключаем DiscountedProductsPage для отображения товаров со скидкой */}
      {onlyDiscounted && <DiscountedProductsPage products={filtered} />}
    </div>
  );
};

export default CategoryProductsPage