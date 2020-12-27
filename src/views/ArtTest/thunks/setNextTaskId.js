import {
	setCurrentTaskId,
	setIsNextBtnClicked,
} from "../../../redux/actions/testActions";
import {
	setTaskEndDate,
	setTestEndDate,
} from "../../../redux/actions/resultActions";

import { getCurrentTime } from "../helpers/workWithApi";

const setNextTaskId = (currentResultIndex) => {
	return (dispatch, getState) => {
		const state = getState();

		const currentTestId = state.testStorage.currentTestId;

		const taskList = state.testStorage.taskList;
		const currentTaskId = state.testStorage[currentTestId].currentTaskId;
		const isTimeConsidered = state.testStorage.currentTask.isTimeConsidered;

		const indexCurrentTaskId = taskList.indexOf(currentTaskId);

		dispatch(setIsNextBtnClicked(false));

		//Save end_date
		if (isTimeConsidered) {
			getCurrentTime().then((endDate) => {
				dispatch(setTaskEndDate(currentTestId, endDate, currentResultIndex));
			});
		}

		if (indexCurrentTaskId === -1) return;
		const nextIndex = indexCurrentTaskId + 1;

		if (nextIndex >= taskList.length) {
			//Set test end_date
			getCurrentTime().then((endDate) => {
				dispatch(setTestEndDate(currentTestId, endDate));
			});
			// console.log("test okonchilsia davaite novii");
			return;
		}

		dispatch(setCurrentTaskId(taskList[nextIndex]));
	};
};

const endTest = () => {};

export default setNextTaskId;
