import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

import Logo from "./Logo";

export default function PageNav() {
	return (
		<nav className={styles.nav}>
			<Logo></Logo>
			<ul>
				<li>
					<NavLink to="/price">Pricing</NavLink>
				</li>
				<li>
					<NavLink to="/product">Product</NavLink>
				</li>
				{/* <li>
					<NavLink to="/app">App</NavLink>
				</li> */}
				<li>
					<NavLink to="/login" className={styles.ctaLink}>
						Login
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
