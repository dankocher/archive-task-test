import styles from "./taskInformation.module.scss";
import React from "react";

import Timer from "../Timer/Timer";
import { useSelector } from "react-redux";

function TaskInformation() {
  const currentTestId = useSelector((state) => state.testStorage.currentTestId);
  const currentTaskIndex = useSelector(
    (state) => state?.testStorage?.[currentTestId]?.currentTaskIndex
  );

  const currentTest = useSelector((state) => state.testStorage[currentTestId]);

  const tasksCounter = currentTest.tasksCounter;

  const currentTaskNumber =
    currentTest.taskList?.[currentTaskIndex].task_number;

  return (
    <div className={styles.container}>
      <span>{`Задание  ${currentTaskNumber} из ${tasksCounter}`}</span>
      <Timer />
    </div>
  );
}

export default TaskInformation;
