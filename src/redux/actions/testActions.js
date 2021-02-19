export const GO_TO_NEXT_TASK = "GO_TO_NEXT_TASK";
export const SET_CURRENT_TEST_ID = "SET_CURRENT_TEST_ID";
export const SET_IS_NEXT_BUTTON_CLICKED = "SET_IS_NEXT_BUTTON_CLICKED";
export const SET_CURRENT_SUBTASK_INDEX = "SET_CURRENT_SUBTASK_INDEX";
export const SET_MAX_OPENED_SUBTASK_INDEX = "SET_MAX_OPENED_SUBTASK_INDEX";
export const SET_LAST_TASK_NUMBER = "SET_LAST_TASK_NUMBER";
export const SESSION_START = "SESSION_START";
export const DELETE_TEST = "DELETE_TEST";
export const SET_CURRENT_TIME = "SET_CURRENT_TIME";
export const SET_IS_LOADING = "SET_IS_LOADING";

export const sesionStart = (tasksCounter, currentTestId, taskList) => ({
  type: SESSION_START,
  payload: { tasksCounter, currentTestId, taskList },
});

export const setCurrentTestId = (currentTestId) => ({
  type: SET_CURRENT_TEST_ID,
  payload: currentTestId,
});

export const goToNextTask = (currentTaskIndex) => ({
  type: GO_TO_NEXT_TASK,
  payload: currentTaskIndex,
});

export const setIsNextBtnClicked = (isNextBtnClicked) => ({
  type: SET_IS_NEXT_BUTTON_CLICKED,
  payload: isNextBtnClicked,
});

export const setCurrentSubTaskIndex = (index) => ({
  type: SET_CURRENT_SUBTASK_INDEX,
  payload: index,
});

export const setMaxOpenedSubTaskIndex = (index) => ({
  type: SET_MAX_OPENED_SUBTASK_INDEX,
  payload: index,
});

export const setLastTaskNumber = (number) => ({
  type: SET_LAST_TASK_NUMBER,
  payload: number,
});

export const deleteTest = (currentTestId) => ({
  type: DELETE_TEST,
  payload: currentTestId,
});

export const setCurrentTime = (currentTime) => ({
  type: SET_CURRENT_TIME,
  payload: currentTime,
});

export const setIsLoading = (isLoading) => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});
