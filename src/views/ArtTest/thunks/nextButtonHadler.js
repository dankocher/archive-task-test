import {
  setCurrentSubTaskIndex,
  setMaxOpenedSubTaskIndex,
  setIsNextBtnClicked,
} from "../../../redux/actions/testActions";

import { ILLUSTRATIONS_ANSWERS } from "../helpers/taskTypes";

import setNextTaskId from "./setNextTaskId";

const nextButtonHadler = (currentResultIndex, responseLimitation) => {
  return (dispatch, getState) => {
    const state = getState();

    const currentTestId = state.testStorage.currentTestId;
    const currentTaskIndex =
      state.testStorage?.[currentTestId]?.currentTaskIndex;

    const currentSubTaskIndex =
      state.testStorage[currentTestId].currentSubTaskIndex;
    const maxOpenedSubTaskIndex =
      state.testStorage[currentTestId].maxOpenedSubTaskIndex;

    const subTaskLength =
      state.resultStorage[currentTestId].results[currentResultIndex].data
        .length - 1;

    const subTaskAnswersRB =
      state.resultStorage[currentTestId].results[currentResultIndex].data[
        currentSubTaskIndex
      ].answers;

    const subTaskAnswersIA =
      state.resultStorage[currentTestId].results[currentResultIndex].data[
        currentSubTaskIndex
      ].answer;

    const task = state.testStorage[currentTestId]?.taskList?.[currentTaskIndex];

    const taskType = task.type;

    dispatch(setIsNextBtnClicked(true));

    if (taskType === ILLUSTRATIONS_ANSWERS) {
      if (
        subTaskAnswersIA == null ||
        subTaskAnswersIA.length < responseLimitation.from
      )
        return;
    } else {
      for (const answer of subTaskAnswersRB) {
        if (answer.optionId == null) return;
      }
    }

    if (currentSubTaskIndex === maxOpenedSubTaskIndex) {
      if (maxOpenedSubTaskIndex < subTaskLength) {
        dispatch(setIsNextBtnClicked(false));
        dispatch(setMaxOpenedSubTaskIndex(maxOpenedSubTaskIndex + 1));
        dispatch(setCurrentSubTaskIndex(currentSubTaskIndex + 1));
      } else {
        // go to next task
        dispatch(setNextTaskId(currentResultIndex));
      }
    } else {
      dispatch(setCurrentSubTaskIndex(currentSubTaskIndex + 1));
    }
  };
};

export default nextButtonHadler;
