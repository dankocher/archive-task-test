export const LOGIN = "LOGIN";
export const START_TASK = "START_TASK";
export const SET_TEXT_AREA_DATA = "SET_TEXT_AREA_DATA";
export const SET_WORD_ANSWER = "SET_WORD_ANSWER";
export const SET_TASK_END_DATE = "SET_TASK_END_DATE";
export const ADD_WELCOME_PAGE = "ADD_WELCOME_PAGE";
export const SET_TEST_END_DATE = "SET_TEST_END_DATE";

export const login = (name, email, currentTestId) => ({
	type: LOGIN,
	payload: { name, email, currentTestId },
});

export const startTask = (
	taskId,
	startData,
	taskList,
	task,
	radioButtonTaskList
) => ({
	type: START_TASK,
	payload: { taskId, startData, taskList, task, radioButtonTaskList },
});

export const addWelcomePage = (taskId, startDate) => ({
	type: ADD_WELCOME_PAGE,
	payload: { taskId, startDate },
});

export const setTextAreaAnswer = (answer, resultIndex, index) => ({
	type: SET_TEXT_AREA_DATA,
	payload: answer,
	resultIndex,
	index,
});

export const setAnswerOfWordsRadioButtons = (
	choosenOption,
	resultIndex,
	dataIndex,
	answersIndex
) => ({
	type: SET_WORD_ANSWER,
	payload: choosenOption,
	resultIndex,
	dataIndex,
	answersIndex,
});

export const setTaskEndDate = (date, resultIndex) => ({
	type: SET_TASK_END_DATE,
	payload: date,
	resultIndex,
});

export const setTestEndDate = () => ({
	type: SET_TEST_END_DATE,
});
