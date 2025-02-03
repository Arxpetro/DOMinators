import React from "react";
import { Link } from "react-router-dom";
import s from "./Header.module.css";

// img
import logo from "./logo.png";
import cart from "./shop_cart.png";

function Header() {
	return (
		<div className={s.header}>

			<Link to="/" className={s.navLink}>
				<img src={logo} alt="logo" className={s.logo}/>
			</Link>
			
			<nav>
				<ul className={s.nav}>
					<li>
						<Link to="/" className={s.navLink}>
							Main page
						</Link>
					</li>
					<li>
						<Link to="/categories" className={s.navLink}>
							Categories
						</Link>
					</li>
					<li>
						<Link to="/products" className={s.navLink}>
							All products
						</Link>
					</li>
					<li>
						<Link to="/sales" className={s.navLink}>
							All sales
						</Link>
					</li>
				</ul>
			</nav>

      <Link to="/cart" className={s.navLink}>
      <img src={cart} alt="cart" className={s.cart}/>
			</Link>
			
		</div>
	);
}

export default Header;
