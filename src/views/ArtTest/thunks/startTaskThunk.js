import { startTask } from "../../../redux/actions/resultActions";
import {
  setCurrentSubTaskIndex,
  setMaxOpenedSubTaskIndex,
} from "../../../redux/actions/testActions";
import { QUSETION_ANSWER } from "../helpers/taskTypes";

import { getCurrentTime } from "../helpers/workWithApi";

const startTaskThunk = (taskId, resultIndex, taskList, radioButtonTaskList) => {
  return (dispatch, getState) => {
    const state = getState();

    const currentTestId = state.testStorage.currentTestId;
    const currentTaskIndex =
      state.testStorage?.[currentTestId]?.currentTaskIndex;

    const task = state.testStorage[currentTestId]?.taskList?.[currentTaskIndex];

    const taskType = task.type;

    if (resultIndex !== -1) return;

    if (taskType !== QUSETION_ANSWER) {
      dispatch(setCurrentSubTaskIndex(0));
      dispatch(setMaxOpenedSubTaskIndex(0));
    }

    getCurrentTime().then((startDate) => {
      dispatch(
        startTask(
          currentTestId,
          taskId,
          startDate,
          taskList,
          task,
          radioButtonTaskList
        )
      );
    });
  };
};

export default startTaskThunk;
