import {
  goToNextTask,
  setIsNextBtnClicked,
  setIsLoading,
} from "../../../redux/actions/testActions";
import {
  setTaskEndDate,
  finishTest,
} from "../../../redux/actions/resultActions";

import { getCurrentTime } from "../helpers/workWithApi";

const setNextTaskId = (currentResultIndex) => {
  return (dispatch, getState) => {
    const state = getState();

    const currentTestId = state.testStorage.currentTestId;
    const currentTaskIndex = state.testStorage[currentTestId].currentTaskIndex;

    const taskList = state.testStorage[currentTestId].taskList;

    dispatch(setIsNextBtnClicked(false));

    if (currentTaskIndex == null) return;
    const nextIndex = currentTaskIndex + 1;

    //Save end_date

    getCurrentTime().then((endDate) => {
      if (nextIndex >= taskList.length) {
        //Set test end_date // end of test
        dispatch(setIsLoading(true)); //after that effect call save data to server
        dispatch(finishTest(currentTestId, endDate, currentResultIndex));

        return;
      }

      //Set task end_date // end of task
      dispatch(setTaskEndDate(currentTestId, endDate, currentResultIndex));
    });

    //After dispatch call effect change task
    dispatch(goToNextTask(nextIndex));
  };
};

export default setNextTaskId;
