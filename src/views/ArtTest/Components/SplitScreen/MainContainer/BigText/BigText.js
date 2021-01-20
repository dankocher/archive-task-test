import styles from "./bigText.module.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetResultIndex } from "../../../../helpers/customHooks/getResultIndex";
import startTaskThunk from "../../../../thunks/startTaskThunk";

function BigTextMainContainer() {
  const dispatch = useDispatch();

  const resultIndex = useGetResultIndex();

  const currentTestId = useSelector((state) => state.testStorage.currentTestId);
  const currentTaskIndex = useSelector(
    (state) => state.testStorage?.[currentTestId]?.currentTaskIndex
  );

  const task = useSelector(
    (state) => state.testStorage[currentTestId]?.taskList?.[currentTaskIndex]
  );
  const taskId = task._id;
  const wordList = task.data.wordList;
  const radioButtonTaskList = task.data.radioButtonTaskList;
  const currentSubTaskIndex = useSelector(
    (state) => state.testStorage[currentTestId].currentSubTaskIndex
  );

  const word = wordList[currentSubTaskIndex]?.word;

  useEffect(() => {
    dispatch(
      startTaskThunk(taskId, resultIndex, wordList, radioButtonTaskList)
    );
  }, [currentTaskIndex]);

  return (
    <div className={styles.container}>
      <h1 className={styles.container__bigText}>{word}</h1>
    </div>
  );
}

export default BigTextMainContainer;
