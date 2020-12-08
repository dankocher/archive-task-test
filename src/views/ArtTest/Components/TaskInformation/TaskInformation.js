import styles from "./taskInformation.module.scss";
import React from "react";

import Timer from "../Timer/Timer";
import { useSelector } from "react-redux";

function TaskInformation() {
	const lastTaskNumber = useSelector(
		(state) => state.testStorage.lastTaskNumber
	);

	const currentTaskNumber = useSelector(
		(state) => state.testStorage.currentTask.task_number
	);

	return (
		<div className={styles.container}>
			<span>{`Задание  ${currentTaskNumber} из ${lastTaskNumber}`}</span>
			<Timer />
		</div>
	);
}

export default TaskInformation;
