import {
  sesionStart,
  setCurrentTestId,
} from "../../../redux/actions/testActions";

import { deleteResult } from "../../../redux/actions/resultActions";

const integrityCheckThunk = (tasksCounter, currentTestId, taskList) => {
  return (dispatch, getState) => {
    const state = getState();

    const testStorage = state.testStorage;

    if (currentTestId in testStorage) {
      if (
        taskList in state[currentTestId] &&
        tasksCounter in state[currentTestId]
      ) {
        dispatch(setCurrentTestId(currentTestId));
      } else {
        dispatch(deleteResult(currentTestId));
        dispatch(sesionStart(tasksCounter, currentTestId, taskList));
      }
    } else {
      dispatch(sesionStart(tasksCounter, currentTestId, taskList));
    }
  };
};

export default integrityCheckThunk;