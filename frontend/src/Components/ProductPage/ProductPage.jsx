// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"; // Для получения параметров URL
// import axios from "axios"; // Для выполнения HTTP-запросов
// import styles from "./ProductPage.module.css"; // Импортируем стили
// import { observer } from 'mobx-react-lite'; // Импортируем MobX для реактивности

// function ProductPage() {
//   const { id } = useParams(); // Получаем ID продукта из URL
//   const [product, setProduct] = useState(null); // Состояние для хранения данных о продукте
//   const [loading, setLoading] = useState(true); // Состояние для управления загрузкой
//   const [error, setError] = useState(null); // Состояние для управления сообщениями об ошибках

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3333/products/${id}`);
//         if (response.data) {
//           setProduct(response.data); // Устанавливаем данные о продукте
//         } else {
//           setError("Product not found"); // Устанавливаем сообщение об ошибке, если продукт не найден
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err); // Логируем ошибку в консоль
//         setError(err.message); // Устанавливаем сообщение об ошибке, если запрос не удался
//       } finally {
//         setLoading(false); // Устанавливаем загрузку в false после получения данных
//       }
//     };

//     fetchProduct(); // Вызываем функцию для получения данных о продукте
//   }, [id]);

//   const handleAddToCart = () => {
//     // Реализация добавления в корзину будет добавлена позже
//     if (product) {
//       // basket.addItem(product); // Добавляем продукт в корзину
//       console.log("Product added to cart:", product); // Логируем добавление продукта в корзину
//     }
//   };

//   // Отображаем состояние загрузки
//   if (loading) return <div>Loading...</div>;
//   // Отображаем состояние ошибки
//   if (error) return <div>Error: {error}</div>;
//   // Отображаем, если продукт не найден
//   if (!product) return <div>Product not found</div>;

//   return (
//     <div className={styles.productPage}>
//       <h1>{product.name}</h1>
//       <img
//         src={`http://localhost:3333${product.image}`}
//         alt={product.title}
//         className={styles.productImage}
//       />
//       <p>{product.description}</p>
//       <h2>Price: {product.price} $</h2>
//       {product.oldPrice && (
//         <h3 className={styles.sale}>Old Price: {product.oldPrice} $</h3>
//       )}
//       <button onClick={handleAddToCart} className={styles.addToCartButton}>
//         Add to Cart
//       </button>
//     </div>
//   );
// }

// export default observer(ProductPage); // mobX позволяет избежать ненужных рендеров и улучшает общую производительность приложения



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Для получения параметров URL
import axios from "axios"; // Для выполнения HTTP-запросов
import styles from "./ProductPage.module.css"; // Импортируем стили

function ProductPage() {
  const { id } = useParams(); // Получаем ID продукта из URL
  const [product, setProduct] = useState(null); // Состояние для хранения данных о продукте
  const [loading, setLoading] = useState(true); // Состояние для управления загрузкой
  const [error, setError] = useState(null); // Состояние для управления ошибками

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/products/${id}`);
        if (response.data) {
          setProduct(response.data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      console.log("Product added to cart:", product);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className={styles.productPage}>
      <h1>{product.title}</h1>
      <img
        src={`http://localhost:3333${product.image}`}
        alt={product.title}
        className={styles.image}
      />
      <p>{product.description}</p>
      <h2>Price: {product.price} $</h2>
      {product.price && <h3 className={styles.discont_price}>Old Price: {product.price} $</h3>}
      <button onClick={handleAddToCart} className={styles.addToCartButton}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductPage;