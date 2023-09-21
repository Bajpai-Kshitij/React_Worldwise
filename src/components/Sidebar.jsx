import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo></Logo>
			<AppNav></AppNav>

			<Outlet></Outlet>
			<Footer></Footer>
		</div>
	);
}
