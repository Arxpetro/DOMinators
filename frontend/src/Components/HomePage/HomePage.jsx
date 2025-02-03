import React from "react";
import DiscountBanner from "./DiscountBanner/DiscountBanner";
import SaleForm from "./SaleForm/SaleForm";
import SaleCardHolder from "./SaleCardHolder/SaleCardHolder";

function HomePage() {
	return (
		<div>
			<DiscountBanner />

			<SaleForm />
			<SaleCardHolder />
		</div>
	);
}

export default HomePage;
