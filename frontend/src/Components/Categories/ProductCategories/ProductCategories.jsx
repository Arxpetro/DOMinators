/* недоработаный компонент вместо него используется другой компонент CategoryProductsPage.jsx*/
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import axios from "axios";
// Функция для получения товаров по категории
const fetchProducts = async (id) => {
    const response = await fetch(`http://localhost:3333/categories/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json(); // Убедитесь, что возвращается массив
};

const ProductCategories = () => {
    const [categories, setCategories] = useState([]); // Состояние для хранения категорий
    const [products, setProducts] = useState([]); // Состояние для хранения продуктов
    const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки
    const [error, setError] = useState(null); // Состояние для хранения ошибок
    const [selectedCategory, setSelectedCategory] = useState(null); // Состояние для выбранной категории

    // Получение категорий при монтировании компонента
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3333/categories/all'); // Получаем категории
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategories(data); // Устанавливаем категории
            } catch (err) {
                setError(err.message); // Устанавливаем сообщение об ошибке
            } finally {
                setLoading(false); // Завершаем загрузку
            }
        };

        fetchCategories(); // Вызываем функцию для получения категорий
    }, []);

    // Получение продуктов при изменении выбранной категории
    useEffect(() => {
        const getProducts = async () => {
            if (selectedCategory) {
                try {
                    const data = await fetchProducts(selectedCategory); // Получаем продукты для выбранной категории
                    console.log('Fetched products:', data); // Логируем полученные данные
                    if (Array.isArray(data)) {
                        setProducts(data); // Устанавливаем только если это массив
                    } else {
                        throw new Error('Expected an array of products');
                    }
                } catch (err) {
                    setError(err.message); // Устанавливаем сообщение об ошибке
                }
            }
        };

        getProducts(); // Вызываем функцию для получения продуктов
    }, [selectedCategory]);

    // Обработка состояния загрузки и ошибок
    if (loading) {
        return <div>Loading categories...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>; // Отображаем сообщение об ошибке
    }

    return (
        <div>
            <h1>Product Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <button onClick={() => setSelectedCategory(category.id)}>
                            {category.name}
                        </button>
                    </li>
                ))}
            </ul>

            {selectedCategory && (
                <div>
                    <h2>Products in Category: {selectedCategory}</h2>
                    {products.length === 0 ? (
                        <p>No products available.</p> // Сообщение, если товаров нет
                    ) : (
                        <div className="product-container"> {/* Контейнер для сетки продуктов */}
                            {products.slice(0, 8).map(product => (
                                <div className="product-card" key={product.id}>
                                    <h3>{product.name}</h3> {/* Название продукта */}
                                    <p>{product.description}</p> {/* Описание продукта */}
                                    <p>Price: ${product.price}</p> {/* Цена продукта */}
                                   
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductCategories; // Экспортируем компонент для использования в других частях приложения