import styles from "./QuestionPage.module.scss";
import React, { useEffect, useRef, createRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Timer from "../Timer/Timer";
import TaskInformation from "../TaskInformation/TaskInformation";
import Button from "../Button/Button";
import QATask from "./QATask/QATask";

import { setIsNextBtnClicked } from "../../../../redux/actions/testActions";
import setNextTaskId from "../../thunks/setNextTaskId";
import startTaskThunk from "../../thunks/startTaskThunk";

const FROM = 1;
const TO = 9999;

function QuestionPage() {
  const dispatch = useDispatch();
  const itemsRef = useRef([]);

  const currentTestId = useSelector((state) => state.testStorage.currentTestId);
  const currentTaskIndex = useSelector(
    (state) => state?.testStorage?.[currentTestId]?.currentTaskIndex
  );

  const [localResponseLimitation, setLocalResponseLimitation] = useState({
    from: FROM,
    to: TO,
  });

  const task = useSelector(
    (state) => state.testStorage[currentTestId]?.taskList?.[currentTaskIndex]
  );
  const taskId = task._id;
  const name = task.name;
  const description = task.description;
  const isAnswerSizeLimited = task.data.isAnswerSizeLimited;
  const QAList = task.data.questionAnswerList;
  const responseLimitation = task.data.responseLimitation;

  const results = useSelector(
    (state) =>
      state.resultStorage[currentTestId].results[currentTaskIndex]?.data
  );

  useEffect(() => {
    Array(QAList.length)
      .fill()
      .map((_, i) => itemsRef[i] || createRef());
  }, []);

  useEffect(() => {
    dispatch(startTaskThunk(taskId, QAList));

    if (!isAnswerSizeLimited) return;
    setLocalResponseLimitation({
      from: responseLimitation?.from || FROM,
      to: responseLimitation?.to || TO,
    });
  }, [currentTaskIndex]);

  const toNextTask = () => {
    dispatch(setIsNextBtnClicked(true));
    for (const [index, result] of results.entries()) {
      if (
        result.answer?.length < localResponseLimitation.from ||
        result.answer == null
      ) {
        itemsRef.current[index].children[2].focus({
          preventScroll: true,
        });

        itemsRef.current[index].scrollIntoView({
          behavior: "smooth",
          // block: "center",
          inline: "center",
        });

        return;
      }
    }

    dispatch(setNextTaskId(currentTaskIndex));
  };

  return (
    <>
      <div className={styles.header}>
        <Timer type={"test"} />
        <TaskInformation />
      </div>
      <div className={styles.centredWrapper}>
        <div className={styles.centredWrapper__container}>
          <h2>{name}</h2>
          {description == null || description.trim() === "" ? null : (
            <p>{description}</p>
          )}

          <div className={styles.centredWrapper__container__body}>
            {QAList.map((element, key) => {
              return (
                <QATask
                  // ref={itemsRef[key]}
                  key={key}
                  index={key}
                  itemsRef={itemsRef}
                  data={element}
                  resultIndex={currentTaskIndex}
                  responseLimitation={localResponseLimitation}
                />
              );
            })}
          </div>

          <Button
            color="black"
            label="Продолжить"
            onClick={() => toNextTask()}
          />
        </div>
      </div>
    </>
  );
}

export default QuestionPage;
