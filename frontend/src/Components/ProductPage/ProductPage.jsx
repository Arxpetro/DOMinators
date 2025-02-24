import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Для получения параметров URL
import axios from "axios"; // Для выполнения HTTP-запросов
import styles from "./ProductPage.module.css"; // Импортируем стили

function ProductPage() {
  const { id } = useParams(); // Получаем ID продукта из URL
  const [product, setProduct] = useState(null); // Состояние для хранения данных о продукте
  const [loading, setLoading] = useState(true); // Состояние для управления загрузкой
  const [error, setError] = useState(null); // Состояние для управления сообщениями об ошибках

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/products/${id}`
        );
        setProduct(response.data); // Устанавливаем данные о продукте
      } catch (err) {
        setError(err.message); // Устанавливаем сообщение об ошибке, если запрос не удался
      } finally {
        setLoading(false); // Устанавливаем загрузку в false после получения данных
      }
    };

    fetchProduct(); // Вызываем функцию для получения данных о продукте
  }, [id]);

  const handleAddToCart = () => {
    // Логика добавления продукта в корзину
    console.log("Product added to cart:", product);
  };

  // Отображаем состояние загрузки
  if (loading) return <div>Loading...</div>;
  // Отображаем состояние ошибки
  if (error) return <div>Error: {error}</div>;
  // Отображаем, если продукт не найден
  if (!product) return <div>Product not found</div>;

  return (
    <div className={styles.productPage}>
      <h1>{product.name}</h1>
      <img
        src={`http://localhost:3333${product.image}`}
        alt={product.title}
        className={styles.productImage}
      />
      <p>{product.description}</p>
      <h2>Price: {product.price} $</h2>
      {product.oldPrice && (
        <h3 className={styles.sale}>Old Price: {product.oldPrice} $</h3>
      )}{" "}
      {/* Отображаем старую цену, если она есть */}
      <button onClick={handleAddToCart} className={styles.addToCartButton}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductPage;
