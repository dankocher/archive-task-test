export const SET_TASK_LIST = "SET_TASK_LIST";
export const SET_CURRENT_TASK_ID = "SET_CURRENT_TASK_ID";
export const SET_CURRENT_TASK = "SET_CURRENT_TASK";
export const SET_CURRENT_TEST_ID = "SET_CURRENT_TEST_ID";
export const SET_IS_NEXT_BUTTON_CLICKED = "SET_IS_NEXT_BUTTON_CLICKED";
export const SET_CURRENT_SUBTASK_INDEX = "SET_CURRENT_SUBTASK_INDEX";
export const SET_MAX_OPENED_SUBTASK_INDEX = "SET_MAX_OPENED_SUBTASK_INDEX";
export const SET_LAST_TASK_NUMBER = "SET_LAST_TASK_NUMBER";

export const setTaskList = (TaskList) => ({
	type: SET_TASK_LIST,
	payload: TaskList,
});

export const setCurrentTestId = (currentTestId) => ({
	type: SET_CURRENT_TEST_ID,
	payload: currentTestId,
});

export const setCurrentTaskId = (currentTaskId) => ({
	type: SET_CURRENT_TASK_ID,
	payload: currentTaskId,
});

export const setCurrentTask = (currentTask) => ({
	type: SET_CURRENT_TASK,
	payload: currentTask,
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
