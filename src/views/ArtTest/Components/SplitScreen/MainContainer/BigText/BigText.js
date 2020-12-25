import styles from "./bigText.module.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetResultIndex } from "../../../../helpers/customHooks/getResultIndex";
import startTaskThunk from "../../../../thunks/startTaskThunk";

const [__empty__, test_id] = window.location.pathname.split('/');

function BigTextMainContainer() {
	const dispatch = useDispatch();

	const resultIndex = useGetResultIndex();

	const task = useSelector((state) => state.testStorage.currentTask);
	//const task = useSelector((state) => state.testStorage.currentTask);
	const taskId = task._id;
	const wordList = task.data.wordList;
	const radioButtonTaskList = task.data.radioButtonTaskList;
	const currentSubTaskIndex = useSelector(
		(state) => state.testStorage.currentSubTaskIndex
		//(state) => state.testStorage.currentSubTaskIndex
	);

	const word = wordList[currentSubTaskIndex]?.word;

	useEffect(() => {
		dispatch(
			startTaskThunk(taskId, resultIndex, wordList, radioButtonTaskList)
		);
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.container__bigText}>{word}</h1>
		</div>
	);
}

export default BigTextMainContainer;
