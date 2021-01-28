import styles from "./bigText.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetResultIndex } from "../../../../helpers/customHooks/getResultIndex";
import startTaskThunk from "../../../../thunks/startTaskThunk";

function BigTextMainContainer() {
  const dispatch = useDispatch();
  // const wordRef = useRef(0);

  // let wordDisplay = wordRef.current.style?.display;

  const [isWordVisible, setIsWordVisible] = useState(true);
  const [word, setWord] = useState(true);

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

  useEffect(() => {
    console.log("asd");
    setIsWordVisible(false);
    setWord(wordList[currentSubTaskIndex]?.word);
  }, [currentSubTaskIndex]);

  useEffect(() => {
    if (isWordVisible) return;
    setIsWordVisible(true);
  }, [isWordVisible]);

  useEffect(() => {
    dispatch(
      startTaskThunk(taskId, resultIndex, wordList, radioButtonTaskList)
    );
  }, [currentTaskIndex]);

  return (
    <div className={styles.container}>
      <h1
        style={!isWordVisible ? { display: "none" } : {}}
        // ref={wordRef}
        className={styles.container__bigText}
      >
        {word}
      </h1>
    </div>
  );
}

export default BigTextMainContainer;
