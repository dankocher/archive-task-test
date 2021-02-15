import {
  startTask,
  addWelcomePage,
} from "../../../redux/actions/resultActions";
import {
  setCurrentSubTaskIndex,
  setMaxOpenedSubTaskIndex,
} from "../../../redux/actions/testActions";
import { QUSETION_ANSWER, WELCOME_SCREEN } from "../helpers/taskTypes";

import { getCurrentTime } from "../helpers/workWithApi";

const startTaskThunk = (taskId, taskList, radioButtonTaskList) => {
  return (dispatch, getState) => {
    const state = getState();

    const currentTestId = state.testStorage.currentTestId;
    const currentTest = state.testStorage?.[currentTestId];
    const currentTaskIndex = currentTest?.currentTaskIndex;

    const task = currentTest?.taskList?.[currentTaskIndex];
    const taskType = task.type;

    const results = state.resultStorage[currentTestId].results;
    const currentTaskId = currentTest.taskList[currentTaskIndex]._id;

    const resultIndex = results.findIndex(
      (element) => element.task_id === currentTaskId
    );

    if (resultIndex !== -1) return;

    if (taskType !== QUSETION_ANSWER) {
      dispatch(setCurrentSubTaskIndex(0));
      dispatch(setMaxOpenedSubTaskIndex(0));
    }

    getCurrentTime().then((startDate) => {
      if (taskType === WELCOME_SCREEN) {
        dispatch(addWelcomePage(currentTestId, taskId, startDate));
      } else {
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
      }
    });
  };
};

export default startTaskThunk;
