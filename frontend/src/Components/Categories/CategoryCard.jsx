import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div className="category-card" onClick={() => navigate(`/categories/${category.id}`)}>
      <img src={`http://localhost:3333${category.image}`} alt={category.name} />
      <h3>{category.name}</h3>
    </div>
  );
};

export default CategoryCard;
