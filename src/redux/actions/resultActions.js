export const LOGIN = "LOGIN";
export const START_TASK = "START_TASK";
export const SET_TEXT_AREA_DATA = "SET_TEXT_AREA_DATA";
export const SET_WORD_ANSWER = "SET_WORD_ANSWER";
export const SET_TASK_END_DATE = "SET_TASK_END_DATE";
export const ADD_WELCOME_PAGE = "ADD_WELCOME_PAGE";
export const SET_TEST_END_DATE = "SET_TEST_END_DATE";

export const login = (name, email, currentTestId, startDate) => ({
	type: LOGIN,
	payload: { name, email, currentTestId, startDate },
});

export const startTask = (
	currentTestId,
	taskId,
	startData,
	taskList,
	task,
	radioButtonTaskList
) => ({
	type: START_TASK,
	payload: {
		currentTestId,
		taskId,
		startData,
		taskList,
		task,
		radioButtonTaskList,
	},
});

export const addWelcomePage = (taskId, startDate) => ({
	type: ADD_WELCOME_PAGE,
	payload: { taskId, startDate },
});

export const setTextAreaAnswer = (
	currentTestId,
	answer,
	resultIndex,
	index
) => ({
	type: SET_TEXT_AREA_DATA,
	payload: answer,
	resultIndex,
	index,
	currentTestId,
});

export const setAnswerOfWordsRadioButtons = (
	currentTestId,
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
	currentTestId,
});

export const setTaskEndDate = (currentTestId, date, resultIndex) => ({
	type: SET_TASK_END_DATE,
	payload: date,
	resultIndex,
	currentTestId,
});

export const setTestEndDate = (currentTestId, endDate) => ({
	type: SET_TEST_END_DATE,
	payload: endDate,
	currentTestId,
});
