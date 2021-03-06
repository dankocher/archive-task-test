import styles from "./sideContainer.module.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import nextButtonHadler from "../../../thunks/nextButtonHadler";
import { useGetResponseLimitation } from "../../../helpers/customHooks/getResponseLimitation";

import { ILLUSTRATIONS_ANSWERS } from "../../../helpers/taskTypes";

import TaskInformation from "../../TaskInformation/TaskInformation";
import Button from "../../Button/Button";
import RadioButtonAnswers from "./RadioButtonAnswers/RadioButtonAnswers";
import TextAreaSettings from "./TextAreaSettings/TextAreaSettings";

function SideContainer() {
  const dispatch = useDispatch();

  const currentTestId = useSelector((state) => state.testStorage.currentTestId);
  const currentTaskIndex = useSelector(
    (state) => state?.testStorage?.[currentTestId]?.currentTaskIndex
  );

  const task = useSelector(
    (state) => state.testStorage[currentTestId]?.taskList?.[currentTaskIndex]
  );
  const title = task.name;
  const description = task.description;
  const radioButtonTaskList = task.data?.radioButtonTaskList;

  const responseLimitation = useGetResponseLimitation();

  const nextButtonClickedHandle = () => {
    dispatch(nextButtonHadler(currentTaskIndex, responseLimitation));
  };

  const getSideTaskView = () => {
    if (task.type === ILLUSTRATIONS_ANSWERS) {
      return <TextAreaSettings />;
    } else {
      return radioButtonTaskList?.map((radioButtonTask, key) => {
        return (
          <RadioButtonAnswers
            key={key}
            index={key}
            radioButtonTask={radioButtonTask}
          />
        );
      });
    }
  };

  return (
    <div className={styles.contentWrapper}>
      <TaskInformation />

      <div className={styles.contentWrapper__body}>
        <article className={styles.container}>
          <h2>{title}</h2>
          <p>{description}</p>
        </article>
        <div className={styles.contentWrapper__body__answersField}>
          {getSideTaskView()}
        </div>
      </div>
      <Button
        color="black"
        label="Продолжить"
        onClick={nextButtonClickedHandle}
      />
    </div>
  );
}

export default SideContainer;
