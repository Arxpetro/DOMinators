import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import HomePage from "./Components/HomePage/HomePage";
import AllProductsPage from "./Components/AllProductsPage/AllProductsPage";

function App() {
	return (
		<BrowserRouter>
			<div className="main">
				<div className="container">
					<Header />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/products"  element={<AllProductsPage key='products' title='All products' discounted={false}/>} />
						<Route path="/sales"  element={<AllProductsPage key='sales' title='Discounted items' discounted={true}/>} />
						
					</Routes>
					{/* Footer */}
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
