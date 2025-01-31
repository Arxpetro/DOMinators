import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import HomePage from "./Components/HomePage/HomePage";

function App() {
	return (
		<BrowserRouter>
			<div className="main">
				<div className="container">
					<Header />
					<Routes>
						<Route path="/" element={<HomePage/>}/>
					</Routes>
					{/* Footer */}
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
