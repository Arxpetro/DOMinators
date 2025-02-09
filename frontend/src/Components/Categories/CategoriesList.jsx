import React from 'react';
import CategoryCard from './CategoryCard';

const categories = [
  { id: 1, name: 'Инструменты', image: '/images/tools.jpg' },
  { id: 2, name: 'Семена и растения', image: '/images/seeds.jpg' },
  { id: 3, name: 'Системы полива', image: '/images/irrigation.jpg' },
];

const CategoriesList = () => {
  return (
    <div className="categories-grid">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoriesList;
