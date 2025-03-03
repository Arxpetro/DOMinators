// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import styles from "./CategoryProductPageNew.module.css";


// const CategoryProductsPage = () => {
//   const { id } = useParams();
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState(null);
//   const [onlyDiscounted, setOnlyDiscounted] = useState(false);
//   const [sortType, setSortType] = useState("default");
//   const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3333/categories/${id}`)
//       .then((response) => {
//         console.log("API ответ (CategoryProductsPage):", response.data);
//         if (response.data?.category && Array.isArray(response.data?.data)) {
//           setCategory(response.data.category);
//           setProducts(response.data.data);
//         } else {
//           console.error("Некорректный формат:", response.data);
//         }
//       })
//       .catch((error) => console.error("Ошибка:", error));
//   }, [id]);

//   // Фильтрация товаров по цене и скидке
//   const filtered = products.filter((p) => {
//     const min = priceFilter.min ? Number(priceFilter.min) : 0;
//     const max = priceFilter.max ? Number(priceFilter.max) : Infinity;
  
//     // Проверяем, находится ли цена в заданном диапазоне
//     const meetsPrice = p.price >= min && p.price <= max;
  
//     // Проверяем, является ли продукт со скидкой
//     const meetsDiscount = onlyDiscounted ? p.discount_price !== null && p.discount_price < p.price : true;
  
//     return meetsPrice && meetsDiscount;
//   });

//   // Сортировка товаров
//   const sorted = [...filtered].sort((a, b) => {
//     switch (sortType) {
//       case "price-low":
//         return a.price - b.price;
//       case "price-high":
//         return b.price - a.price;
//       case "name-az":
//         return a.title.localeCompare(b.title);
//       case "name-za":
//         return b.title.localeCompare(a.title);
//       default:
//         return 0;
//     }
//   });

//   return (
//     <div className={styles.container}>
//   {/* Навигация */}
//   {category?.title && (
//     <nav className={styles.breadcrumbs}>
//       <Link to="/" className={`${styles.breadcrumbButton} ${styles.lightText}`}>Main Page</Link>
//       <span className={styles.separator}></span> {/* Разделитель */}
//       <Link to="/categories" className={`${styles.breadcrumbButton} ${styles.lightText}`}>Categories</Link>
//       <span className={styles.separator}></span> {/* Разделитель */}
//       <span className={`${styles.breadcrumbButton} ${styles.darkText}`}>{category.title}</span>
//     </nav>
//   )}

//       {/* Заголовок категории */}
//       {category && <h2 className={styles.categoryTitle}>{category.title}</h2>}

//       {/* Фильтры */}
//       <div className={styles.filters}>
//         <div className={styles.filterBlock}>
//           <label>Price:</label>
//           <input
//             type="number"
//             placeholder="From"
//             value={priceFilter.min}
//             onChange={(e) => setPriceFilter({ ...priceFilter, min: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="To"
//             value={priceFilter.max}
//             onChange={(e) => setPriceFilter({ ...priceFilter, max: e.target.value })}
//           />
//         </div>

//         <div className={styles.filterBlock}>
//           <label>Sorted:</label>
//           <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
//             <option value="default">By Default</option>
//             <option value="price-low">Price: Low to High</option>
//             <option value="price-high">Price: High to Low</option>
//             <option value="name-az">Name A-Z</option>
//             <option value="name-za">Name Z-A</option>
//           </select>
//         </div>

//         {/* Фильтр "Discounted Items" */}
//         <div className={styles.filterBlock}>
//           <label>
//             Discounted Items
//             <input
//               type="checkbox"
//               checked={onlyDiscounted}
//               onChange={() => setOnlyDiscounted(!onlyDiscounted)}
//               className={styles.discountCheckbox}
//             />
//           </label>
//         </div>
//       </div>

//       {/* Контейнер товаров (2 ряда по 4 товара) */}
// <div className={styles.productsContainer}>
//   {sorted.length > 0 ? (
//     sorted.slice(0, 8).map((product) => (
//       <div key={product.id} className={styles.productCard}>
//         <img
//           src={`http://localhost:3333${product.image}`} //
//           alt={product.title}
//           className={styles.productImage}
//         />
//         <h3 className={styles.title}>{product.title}</h3>
//         <p className={styles.price}>
//           {product.price ? (
//             <>
//               <span className={styles.price}>{product.price}</span>
//               <span className={styles.discount_price}>{product.price}</span>
//             </>
//           ) : (
//             <span className={styles.discount_price}>{product.price}</span>
//           )}
//         </p>
//       </div>
//     ))
//   ) : (
//     <p className={styles.noProducts}>No products found</p>
//   )}
// </div>
    
//     </div>
//   );
// };

// export default CategoryProductsPage;

// perfect version
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./CategoryProductPageNew.module.css"; 
import ProductCard from "../ProductCard/ProductCard"; // Используем ProductCard для отображения товаров

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
  console.log(products);
  
 // Фильтрация по цене и скидке
 const filtered = products.filter((p) => {
  const min = priceFilter.min ? Number(priceFilter.min) : 0;
  const max = priceFilter.max ? Number(priceFilter.max) : Infinity;
  const meetsPrice = p.price >= min && p.price <= max;
  const meetsDiscount = onlyDiscounted ? p.discont_price > p.price : true;// посмотреть где взяла!! discounted prrice
  return meetsPrice && meetsDiscount;//сделать отдельным фильтрациями
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
      <Link to="/" className={`${styles.breadcrumbButton} ${styles.lightText}`}>Main Page</Link>
      <span className={styles.separator}></span> {/* Разделитель */}
      <Link to="/categories" className={`${styles.breadcrumbButton} ${styles.lightText}`}>Categories</Link>
      <span className={styles.separator}></span> {/* Разделитель */}
      <span className={`${styles.breadcrumbButton} ${styles.darkText}`}>{category.title}</span>
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
      onChange={() => setOnlyDiscounted((prev) => !prev)
       }
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
        
            return <ProductCard key={product.id} item={product} />;
          })
        ) : (
          <p className={styles.noProducts}>No products found</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;