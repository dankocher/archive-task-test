import { setCurrentSubTaskIndex } from "../../../redux/actions/testActions";

import { ILLUSTRATIONS_ANSWERS } from "../helpers/taskTypes";

const [__empty__, test_id] = window.location.pathname.split('/')

const setNextSubTaskThunk = (currentResultIndex, responseLimitation) => {
	return (dispatch, getState) => {
		const state = getState();

		const currentSubTaskIndex = state.testStorage.currentSubTaskIndex;
		const maxOpenedSubTaskIndex = state.testStorage.maxOpenedSubTaskIndex;
		// const currentSubTaskIndex = state.testStorage.currentSubTaskIndex;
		// const maxOpenedSubTaskIndex = state.testStorage.maxOpenedSubTaskIndex;

		const subTaskAnswersIA =
			state.resultStorage.results[currentResultIndex].data[currentSubTaskIndex]
			// state.resultStorage[test_id].results[currentResultIndex].data[currentSubTaskIndex]
			// 	.answer;

		const taskType = state.testStorage.currentTask.type;
		//const taskType = state.testStorage.currentTask.type;

		if (taskType === ILLUSTRATIONS_ANSWERS) {
			if (
				subTaskAnswersIA == null ||
				subTaskAnswersIA.length < responseLimitation.from
			)
				return;
		}

		if (currentSubTaskIndex === maxOpenedSubTaskIndex) return;
		dispatch(setCurrentSubTaskIndex(currentSubTaskIndex + 1));
	};
};

export default setNextSubTaskThunk;
