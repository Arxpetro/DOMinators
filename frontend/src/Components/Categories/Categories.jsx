import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3333/categories/all");
        console.log('response.data', response.data);
        setCategories(response.data.slice(0, 4)); // Get only the first 4 categories
      } catch (err) {
        setError("Error loading categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="categories-container">
      <div className="categories-content">
        <div className="categories-header">
          <h1 className="categories-title">Categories</h1>
        </div>
        <div className="categories-images">
          {categories.map((category) => (
            <div key={category.id} className="categories-item">
              <img
                src={`http://localhost:3333/${category.image}`}
                alt={category.title}
                className="categories-image"
              />
              <h3 className="categories-text">{category.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;