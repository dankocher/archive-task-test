import styles from "./bigText.module.scss";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetResultIndex } from "../../../../helpers/customHooks/getResultIndex";
import startTaskThunk from "../../../../thunks/startTaskThunk";

function BigTextMainContainer() {
  const dispatch = useDispatch();
  const wordRef = useRef(0);

  let wordDisplay = wordRef.current.style?.display;

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

  // useEffect(() => {
  //   console.log("ODIN");
  //   console.log(wordDisplay);

  //   wordRef.current.style.display = "none";
  //   console.log(wordRef.current.style.display);
  // }, [currentSubTaskIndex]);

  // useEffect(() => {
  //   console.log("DVA");
  //   console.log(wordRef.current.style.display);

  //   // if (wordDisplay === "block") return;
  //   wordRef.current.style.display = "block";
  //   console.log(wordRef.current.style.display);
  // }, [wordDisplay]);

  useEffect(() => {
    dispatch(
      startTaskThunk(taskId, resultIndex, wordList, radioButtonTaskList)
    );
  }, [currentTaskIndex]);

  return (
    <div className={styles.container}>
      <h1 ref={wordRef} className={styles.container__bigText}>
        {word}
      </h1>
    </div>
  );
}

export default BigTextMainContainer;
