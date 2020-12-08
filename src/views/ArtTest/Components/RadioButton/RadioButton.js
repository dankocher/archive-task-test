import styles from "./RadioButton.module.scss";
import React from "react";

import { isFunction } from "../../utils/validators/isFunction";

function RadioButton(props) {
	const color = props.color ? props.color : "#000000";

	const onChange = isFunction(props.onChange)
		? props.onChange
		: () => {
				console.log("is not a function");
		  };

	const isChecked = () => {
		return props.checkedValue === props.value;
	};

	return (
		<div className={styles.container}>
			<div>
				<label
					style={{ borderColor: color }}
					htmlFor={props.id}
					className={styles.container__radioButton}
				>
					{isChecked() ? (
						<label
							style={{ backgroundColor: color }}
							htmlFor={props.id}
							className={styles.container__radioButton__checked}
						></label>
					) : null}
				</label>
			</div>

			<label style={{ color: color }} htmlFor={props.id}>
				{props.label}
			</label>
			<input
				id={props.id}
				name={props.name}
				type="radio"
				checked={isChecked()}
				value={props.value}
				onChange={(event) => onChange(event)}
			/>
		</div>
	);
}

export default RadioButton;
