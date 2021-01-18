import {
  setCurrentTaskIndex,
  setIsNextBtnClicked,
} from "../../../redux/actions/testActions";
import {
  setTaskEndDate,
  setTestEndDate,
} from "../../../redux/actions/resultActions";

import { getCurrentTime } from "../helpers/workWithApi";

const setNextTaskId = (currentResultIndex) => {
  return (dispatch, getState) => {
    const state = getState();

    const currentTestId = state.testStorage.currentTestId;
    const currentTaskIndex = state.testStorage[currentTestId].currentTaskIndex;

    const taskList = state.testStorage[currentTestId].taskList;

    const task = taskList?.[currentTaskIndex];

    const isTimeConsidered = task.isTimeConsidered;

    dispatch(setIsNextBtnClicked(false));

    //Save end_date
    if (isTimeConsidered) {
      getCurrentTime().then((endDate) => {
        dispatch(setTaskEndDate(currentTestId, endDate, currentResultIndex));
      });
    }

    if (currentTaskIndex == null) return;
    const nextIndex = currentTaskIndex + 1;

    if (nextIndex >= taskList.length) {
      //Set test end_date // end of test
      getCurrentTime().then((endDate) => {
        dispatch(setTestEndDate(currentTestId, endDate));
      });
      return;
    }

    dispatch(setCurrentTaskIndex(nextIndex));
  };
};

export default setNextTaskId;
