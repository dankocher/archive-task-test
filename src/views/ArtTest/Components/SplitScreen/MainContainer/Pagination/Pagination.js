import styles from "./pagination.module.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetResponseLimitation } from "../../../../helpers/customHooks/getResponseLimitation";

import subTaskArrow from "../../../../helpers/icons/subTask-arrow";

import setNextSubTaskThunk from "../../../../thunks/setNextSubTaskThunk";
import setPreveusSubTaskThunk from "../../../../thunks/setPreveusSubTaskThunk";

function Pagination() {
  const dispatch = useDispatch();

  const currentTestId = useSelector((state) => state.testStorage.currentTestId);

  const currentTest = useSelector((state) => state.testStorage[currentTestId]);

  const currentSubTaskIndex = currentTest.currentSubTaskIndex;
  const maxOpenedSubTaskIndex = currentTest.maxOpenedSubTaskIndex;

  const currentTaskIndex = currentTest?.currentTaskIndex;

  const responseLimitation = useGetResponseLimitation();

  const subTaskLength = useSelector(
    (state) =>
      state.resultStorage[currentTestId].results[currentTaskIndex]?.data.length
  );

  const getIsUnvisibleLefftArrow = () => {
    return currentSubTaskIndex === 0;
  };

  const getIsUnvisibleRightArrow = () => {
    return (
      currentSubTaskIndex === subTaskLength - 1 ||
      currentSubTaskIndex === maxOpenedSubTaskIndex
    );
  };

  const setNextSubTask = () => {
    dispatch(setNextSubTaskThunk(currentTaskIndex, responseLimitation));
  };

  const setPreveusSubTask = () => {
    dispatch(setPreveusSubTaskThunk());
  };

  return (
    <>
      <div className={styles.container}>
        <button
          style={{
            visibility: getIsUnvisibleLefftArrow() ? "hidden" : "visible",
          }}
          className={"hidden-button"}
          // disabled={getIsDisabledLefftArrow()}
          onClick={setPreveusSubTask}
        >
          <i>{subTaskArrow}</i>
        </button>
        <span className={styles.container__paginationInfo}>
          {`Подзадание ${currentSubTaskIndex + 1 || ""} из ${
            subTaskLength || ""
          }`}
        </span>
        <button
          className={"hidden-button"}
          // disabled={getIsDisabledRightArrow()}
          style={{
            visibility: getIsUnvisibleRightArrow() ? "hidden" : "visible",
          }}
          onClick={setNextSubTask}
        >
          <i className={styles.container__rightArrow}>{subTaskArrow}</i>
        </button>
      </div>
    </>
  );
}

export default Pagination;
