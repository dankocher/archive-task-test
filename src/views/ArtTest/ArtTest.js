import styles from "./index.module.scss";
import React from "react";
import { useSelector } from "react-redux";

import Loader from "./Components/Loader";

function ArtTest() {
	const isRehydrated = useSelector(
		(state) => state.rehydrateStorage.isRehydrated
	);

	return (
		<div className={styles.mainContainer}>
			{isRehydrated ? <Loader /> : null}
		</div>
	);
}

export default ArtTest;
