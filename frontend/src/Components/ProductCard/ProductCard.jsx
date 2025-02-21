import React from "react";
import s from "./ProductCard.module.css";

function ProductCard({ item: product }) {
	//console.log("Получен product в ProductCard:", product);

	if (!product || typeof product !== "object") {
	  return <p>Ошибка загрузки товара</p>;
	}

	return (
		<div className={s.container}>
			{/* Верхняя часть карточки с картинкой */}
			<div
				style={{
					backgroundImage: `url(http://localhost:3333${product.image})`,
				}}
				className={s.productImg}
			>
				{/* Оранжевая наклейка со скидкой */}
				{product.discont_price !== null && (
					<div className={s.salePercent}>
						{"-" +
							Math.round(
								((product.price - product.discont_price) / product.price) * 100
							) +
							"%"}
					</div>
				)}
			</div>

			{/* Нижняя часть карточки с названием и ценой */}
			<div className={s.productInfo}>
				<h4
					style={{
						
						whiteSpace: "nowrap" /* Запрещает перенос текста */,
						overflow: "hidden" /* Скрывает текст, выходящий за границу */,
						textOverflow: "ellipsis",
						fontSize: "1.25rem",
						fontWeight: "500",
						color: "#424436",
						marginBottom: "1rem",
					}}
				>
					{product.title}
				</h4>

				{/* Цена. Если есть скидка, отобразит обе цены. Если скидки нет - просто цену */}
				<div>
					{product.discont_price === null ? (
						<span className={s.dprice}>{"$" + product.price}</span>
					) : (
						<>
							<span className={s.dprice}>{"$" + product.discont_price}</span>
							<span className={s.price}>{"$" + product.price}</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
