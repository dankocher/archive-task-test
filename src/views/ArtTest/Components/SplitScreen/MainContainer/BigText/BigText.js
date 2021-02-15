import styles from "./bigText.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import startTaskThunk from "../../../../thunks/startTaskThunk";

function BigTextMainContainer() {
  const dispatch = useDispatch();

  const [isWordVisible, setIsWordVisible] = useState(true);
  const [word, setWord] = useState(true);

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

  useEffect(() => {
    setWord(wordList[currentSubTaskIndex]?.word);

    if (!isWordVisible) return;
    setIsWordVisible(false);
  }, [currentSubTaskIndex]);

  useEffect(() => {
    if (isWordVisible) return;

    setTimeout(() => {
      setIsWordVisible(true);
    }, 50);
  }, [isWordVisible]);

  useEffect(() => {
    dispatch(startTaskThunk(taskId, wordList, radioButtonTaskList));
  }, [currentTaskIndex]);

  return (
    <div className={styles.container}>
      <h1
        style={isWordVisible ? {} : { display: "none" }}
        className={styles.container__bigText}
      >
        {word}
      </h1>
    </div>
  );
}

export default BigTextMainContainer;
