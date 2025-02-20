import React, { useEffect, useState } from "react";


function Categories_example() {
	const [imageUrl, setImageUrl] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchImage = async () => {
			try {
				setLoading(true);
				setError("");

				// Запрос на сервер
				const response = await fetch("http://localhost:3333/categories/1");
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}

				const data = await response.json(); // Если сервер возвращает JSON
				console.log(data);

				setImageUrl(data);
			} catch (err) {
				setError(err.message || "Произошла ошибка");
			} finally {
				setLoading(false);
			}
		};

		fetchImage();
	}, []);

	if (loading) return <p>Загрузка изображения...</p>;
	if (error) return <p>Ошибка: {error}</p>;

	return (
		<div>
			<img
				src={`http://localhost:3333/${imageUrl.category.image}`}
				alt="hgfghf"
			/>
		</div>
	);
}

export default Categories_example;
