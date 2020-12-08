import styles from "./bullets.module.scss";
import React from "react";

import Bullet from "./Bullet/Bullet";

function Bullets(props) {
	return (
		<div className={styles.container}>
			{props.arrOfImages.map((_, key) => {
				return key === props.active ? (
					<Bullet active={true} key={key} index={key} />
				) : (
					<Bullet active={false} key={key} index={key} />
				);
			})}
		</div>
	);
}

export default Bullets;
