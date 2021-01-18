import { setCurrentSubTaskIndex } from "../../../redux/actions/testActions";

import { ILLUSTRATIONS_ANSWERS } from "../helpers/taskTypes";

const setNextSubTaskThunk = (currentResultIndex, responseLimitation) => {
  return (dispatch, getState) => {
    const state = getState();

    const currentTestId = state.testStorage.currentTestId;
    const currentTaskIndex = state.testStorage?.[currentTestId]?.currentTaskIndex;

    const currentSubTaskIndex =
      state.testStorage[currentTestId].currentSubTaskIndex;
    const maxOpenedSubTaskIndex =
      state.testStorage[currentTestId].maxOpenedSubTaskIndex;

    const subTaskAnswersIA =
      state.resultStorage[currentTestId].results[currentResultIndex].data[
        currentSubTaskIndex
      ].answer;

    const task = state.testStorage[currentTestId]?.taskList?.[currentTaskIndex];

    const taskType = task.type;

    if (taskType === ILLUSTRATIONS_ANSWERS) {
      if (
        subTaskAnswersIA == null ||
        subTaskAnswersIA.length < responseLimitation.from
      )
        return;
    }

    if (currentSubTaskIndex === maxOpenedSubTaskIndex) return;
    dispatch(setCurrentSubTaskIndex(currentSubTaskIndex + 1));
  };
};

export default setNextSubTaskThunk;
