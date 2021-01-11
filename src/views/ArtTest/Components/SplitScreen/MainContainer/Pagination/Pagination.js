import styles from "./pagination.module.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetResponseLimitation } from "../../../../helpers/customHooks/getResponseLimitation";
import { useGetResultIndex } from "../../../../helpers/customHooks/getResultIndex";

import subTaskArrow from "../../../../helpers/icons/subTask-arrow";

import setNextSubTaskThunk from "../../../../thunks/setNextSubTaskThunk";
import setPreveusSubTaskThunk from "../../../../thunks/setPreveusSubTaskThunk";

function Pagination() {
  const dispatch = useDispatch();

  const currentTestId = useSelector((state) => state.testStorage.currentTestId);

  const currentSubTaskIndex = useSelector(
    (state) => state.testStorage[currentTestId].currentSubTaskIndex
  );
  const maxOpenedSubTaskIndex = useSelector(
    (state) => state.testStorage[currentTestId].maxOpenedSubTaskIndex
  );

  const currentResultIndex = useGetResultIndex();
  const responseLimitation = useGetResponseLimitation();

  const subTaskLength = useSelector(
    (state) =>
      state.resultStorage[currentTestId].results[currentResultIndex]?.data
        .length
  );

  const getIsUnvisibleLefftArrow = () => {
    if (currentSubTaskIndex === 0) return true;
    return false;
  };

  const getIsUnvisibleRightArrow = () => {
    if (currentSubTaskIndex === subTaskLength - 1) return true;
    return false;
  };

  const getIsDisabledLefftArrow = () => {
    if (currentSubTaskIndex === 0) return true;
    return false;
  };

  const getIsDisabledRightArrow = () => {
    if (currentSubTaskIndex === subTaskLength - 1) return true;
    if (currentSubTaskIndex === maxOpenedSubTaskIndex) return true;
    return false;
  };

  const setNextSubTask = () => {
    dispatch(setNextSubTaskThunk(currentResultIndex, responseLimitation));
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
          disabled={getIsDisabledLefftArrow()}
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
          disabled={getIsDisabledRightArrow()}
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
