import {
	setCurrentTaskId,
	setIsNextBtnClicked,
} from "../../../redux/actions/testActions";
import { setTaskEndDate, setTestEndDate } from "../../../redux/actions/resultActions";

const setNextTaskId = (currentResultIndex) => {
	return (dispatch, getState) => {
		const state = getState();
		const taskList = state.testStorage.taskList;
		const currentTaskId = state.testStorage.currentTaskId;
		const isTimeConsidered = state.testStorage.currentTask.isTimeConsidered;

		const indexCurrentTaskId = taskList.indexOf(currentTaskId);

		dispatch(setIsNextBtnClicked(false));

		//Save end_date
		const endDate = isTimeConsidered ? new Date().getTime() : undefined;
		dispatch(setTaskEndDate(endDate, currentResultIndex));

		if (indexCurrentTaskId === -1) return;
		const nextIndex = indexCurrentTaskId + 1;

		if (nextIndex >= taskList.length) {
			//Set end date
			dispatch(setTestEndDate());
			console.log("test okonchilsia davaite novii");
			return;
		}

		dispatch(setCurrentTaskId(taskList[nextIndex]));
	};
};

const endTest = () => {};

export default setNextTaskId;
