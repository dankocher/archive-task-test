import styles from "./bullet.module.scss";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import bulletIcon from "../../../../../../helpers/icons/bullet-icon";

import { setImageIndex } from "../../../../../../../../redux/actions/caruselActions";

const classNames = require("classnames");

function Bullet(props) {
	const dispatch = useDispatch();
	const currentImageIndex = useSelector((state) => state.current);

	const { active, index } = props;

	const handleSetImageIndex = () => {
		if (currentImageIndex === index) {
			return;
		} else {
			dispatch(setImageIndex(index));
		}
	};

	const bullet = classNames("hidden-button", {
		[styles.active]: active,
		[styles.default]: !active,
	});

	return (
		<>
			<button className={bullet} onClick={handleSetImageIndex}>
				<i>{bulletIcon}</i>
			</button>
		</>
	);
}

export default Bullet;
