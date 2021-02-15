import styles from "./RadioButtonAnswers.module.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import RadioButton from "../../../RadioButton/RadioButton";

import { setAnswerOfWordsRadioButtons } from "../../../../../../redux/actions/resultActions";

function RadioButtonAnswers(props) {
  const { index, radioButtonTask } = props;

  const dispatch = useDispatch();

  const currentTestId = useSelector((state) => state.testStorage.currentTestId);

  const currentSubTaskIndex = useSelector(
    (state) => state.testStorage[currentTestId].currentSubTaskIndex
  );

  const currentTaskIndex = useSelector(
    (state) => state.testStorage?.[currentTestId]?.currentTaskIndex
  );

  const checkedValue = useSelector(
    (state) =>
      state.resultStorage[currentTestId]?.results[currentTaskIndex]?.data[
        currentSubTaskIndex
      ]?.answers[index]?.optionId
  );

  const isNextBtnClicked = useSelector(
    (state) => state.testStorage[currentTestId].isNextBtnClicked
  );

  const chooseOption = (event) => {
    const value = parseInt(event.target.value);
    dispatch(
      setAnswerOfWordsRadioButtons(
        currentTestId,
        value,
        currentTaskIndex,
        currentSubTaskIndex,
        index
      )
    );
  };

  const isValid = () => {
    if (!isNextBtnClicked) return true;
    if (checkedValue != null) return true;
    return false;
  };

  const chooseColor = () => {
    return isValid() ? "#424242" : "#da1414";
  };

  return (
    <>
      <h3 style={{ color: chooseColor() }} className={styles.title}>
        {radioButtonTask.question}
      </h3>
      <div className={styles.container}>
        {radioButtonTask.radioButtonOptionList.map((element, key) => {
          return (
            <RadioButton
              key={key}
              id={`${element.option}-${index}-${key + element.id}`}
              name={`${radioButtonTask.question}-${index}`}
              color={chooseColor()}
              value={`${element.id}`}
              label={element.option}
              onChange={chooseOption}
              checkedValue={`${checkedValue}`}
            />
          );
        })}
      </div>
    </>
  );
}

export default RadioButtonAnswers;
