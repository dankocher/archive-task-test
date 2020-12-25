import {
	SET_TASK_LIST,
	SET_CURRENT_TEST_ID,
	SET_CURRENT_TASK_ID,
	SET_CURRENT_TASK,
	SET_IS_NEXT_BUTTON_CLICKED,
	SET_CURRENT_SUBTASK_INDEX,
	SET_MAX_OPENED_SUBTASK_INDEX,
	SET_LAST_TASK_NUMBER,
} from "../actions/testActions";

import {getTestState} from "../../utils/getTestState";

const initialState = {
	taskList: [],
	// currentTaskId: "5f720a047e5e6f4b670dfb5a",
	currentTaskId: undefined,
	currentTask: undefined,
	isNextBtnClicked: false,
	currentSubTaskIndex: undefined,
	maxOpenedSubTaskIndex: undefined,
	lastTaskNumber: undefined,
};

function testStorage(state = initialState, action) {
//function testStorage(state = {}, action) {
	//const {testState, test_id} = getTestState(state, initialState);
	//console.log(action.type)
	switch (action.type) {
		case SET_CURRENT_TEST_ID:
			// return { ...state,
			// 	[test_id]: {
			// 	...testState,
			// 	currentTestId: action.payload
			// 	}};
			return { ...state, currentTestId: action.payload };
		case SET_TASK_LIST:
			//console.log('TASK_LIST', action.payload)
			// return { ...state,
			// 	[test_id]: {
			// 		...testState,
			// 		taskList: action.payload
			// 	}};
			return { ...state, taskList: action.payload };
		case SET_CURRENT_TASK_ID:
			//console.log('CURRENT', state, action.payload)
			// return { ...state,
			// 	[test_id]: {
			// 		...testState,
			// 		currentTaskId: action.payload
			// 	}};
			return { ...state, currentTaskId: action.payload };
		case SET_CURRENT_TASK:
			// return { ...state,
			// 	[test_id]: {
			// 		...testState,
			// 		currentTask: action.payload
			// 	}};
			return { ...state, currentTask: action.payload };
		case SET_IS_NEXT_BUTTON_CLICKED:
			// return { ...state,
			// 	[test_id]: {
			// 		...testState,
			// 		isNextBtnClicked: action.payload
			// 	}};
			return { ...state, isNextBtnClicked: action.payload };
		case SET_CURRENT_SUBTASK_INDEX:
			// return { ...state,
			// 	[test_id]: {
			// 		...testState,
			// 		currentSubTaskIndex: action.payload
			// 	}};
			return { ...state, currentSubTaskIndex: action.payload };
		case SET_MAX_OPENED_SUBTASK_INDEX:
			// return { ...state,
			// 	[test_id]: {
			// 		...testState,
			// 		maxOpenedSubTaskIndex: action.payload
			// 	}};
			return { ...state, maxOpenedSubTaskIndex: action.payload };
		case SET_LAST_TASK_NUMBER:
			// return { ...state,
			// 	[test_id]: {
			// 		...testState,
			// 		lastTaskNumber: action.payload
			// 	}};
			return { ...state, lastTaskNumber: action.payload };
		default:
			return state;
	}
}

export default testStorage;
