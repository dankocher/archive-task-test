import React from "react";
import styles from "./button.module.scss";

import { isFunction } from "../../utils/validators/isFunction";

const classNames = require("classnames");

function Button(props) {
	const btn = classNames(styles.btn, {
		[styles.white]: props.color === "white",
		[styles.black]: props.color !== "white",
	});

	const onClick = isFunction(props.onClick)
		? props.onClick
		: () => console.log("Is not a function");

	return (
		<button onClick={() => onClick()} className={btn}>
			{props.label}
		</button>
	);
}

export default Button;
