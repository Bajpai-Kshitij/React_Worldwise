import styles from "./Button.module.css";

import PropTypes from "prop-types";

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	children: PropTypes.element.isRequired,
	type: PropTypes.string.isRequired,
};

function Button({ children, onClick, type }) {
	return (
		<button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
			{children}
		</button>
	);
}

export default Button;
