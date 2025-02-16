import React from "react";
import s from "./ProductCard.module.css";

function ProductCard({ item }) {
	// console.log(item);

	return (
		<div className={s.container}>
			{/* Верхняя часть карточки с картинкой */}
			<div
				style={{
					backgroundImage: `url(http://localhost:3333${item.image})`,
				}}
				className={s.productImg}
			>
				{/* Оранжевая наклейка со скидкой */}
				{item.discont_price !== null ? (
					<div className={s.salePercent}>
						{"-" +
							Math.round(
								((item.price - item.discont_price) / item.price) * 100
							) +
							"%"}
					</div>  
				) : null}  {/* раньше был пустой объект {}, теперь null */}
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
					{item.title}
				</h4>

				{/* Цена. Если есть скидка, отобразит обе цены. Если скидки нет - просто цену */}
				<div>
					{item.discont_price === null ? (
						<span className={s.dprice}>{"$" + item.price}</span>
					) : (
						<>
							<span className={s.dprice}>{"$" + item.discont_price}</span>
							<span className={s.price}>{"$" + item.price}</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
