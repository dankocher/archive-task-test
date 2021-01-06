import styles from "./mainContainer.module.scss";
import React from "react";

import Timer from "../../Timer/Timer";
import Pagination from "./Pagination/Pagination";

function MainContainer(props) {
	return (
		<div className={styles.container}>
			<div className={styles.container__header}>
				{/* <Timer type={"test"} /> */}
			</div>
			<div className={styles.container__body}>{props.mainContainerBody}</div>
			<div className={styles.container__footer}>
				<Pagination />
			</div>
		</div>
	);
}

export default MainContainer;
