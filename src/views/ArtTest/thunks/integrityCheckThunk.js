import {
  sesionStart,
  setCurrentTestId,
} from "../../../redux/actions/testActions";

import { deleteResult } from "../../../redux/actions/resultActions";

const integrityCheckThunk = (
  tasksCounter,
  currentTestId,
  taskList,
  testName
) => {
  return (dispatch, getState) => {
    const state = getState();

    const testStorage = state.testStorage;

    if (currentTestId in testStorage) {
      if (testStorage[currentTestId].currentTaskIndex == null) {
        dispatch(sesionStart(tasksCounter, currentTestId, taskList, testName));
      } else if (
        taskList in testStorage[currentTestId] &&
        tasksCounter in testStorage[currentTestId]
      ) {
        dispatch(setCurrentTestId(currentTestId));
      } else {
        dispatch(deleteResult(currentTestId));
        dispatch(sesionStart(tasksCounter, currentTestId, taskList, testName));
      }
    } else {
      dispatch(sesionStart(tasksCounter, currentTestId, taskList, testName));
    }
  };
};

export default integrityCheckThunk;
