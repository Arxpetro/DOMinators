import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For getting URL parameters
import axios from "axios"; // For making HTTP requests
import styles from "./ProductPage.module.css"; // Importing modular styles


function ProductPage() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // State to hold product data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/products/${id}`);
        setProduct(response.data); // Set the product data
      } catch (err) {
        setError(err.message); // Set error message if the request fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProduct(); // Call the function to fetch product data
  }, [id]);

  const handleAddToCart = () => {
    // Logic to add the product to the cart
    console.log("Product added to cart:", product);
  };

  // Render loading state
  if (loading) return <div>Loading...</div>;
  // Render error state
  if (error) return <div>Error: {error}</div>;
  // Render if product is not found
  if (!product) return <div>Product not found</div>;

  return (
    <div className={styles.productPage}>
      <h1>{product.name}</h1>
      <img src={`url(http://localhost:3333${product.image})`} alt={product.title} />
      <p>{product.description}</p>
      <h2>Price: {product.price} $</h2>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductPage;