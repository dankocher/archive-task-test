import { startTask } from "../../../redux/actions/resultActions";
import {
	setCurrentSubTaskIndex,
	setMaxOpenedSubTaskIndex,
} from "../../../redux/actions/testActions";
import { QUSETION_ANSWER } from "../helpers/taskTypes";

const startTaskThunk = (taskId, resultIndex, taskList, radioButtonTaskList) => {
	return (dispatch, getState) => {
		const state = getState();

		const task = state.testStorage.currentTask;
		const isTimeConsidered = task.isTimeConsidered;
		const taskType = task.type;

		if (resultIndex !== -1) return;

		if (taskType !== QUSETION_ANSWER) {
			dispatch(setCurrentSubTaskIndex(0));
			dispatch(setMaxOpenedSubTaskIndex(0));
		}

		const startDate = isTimeConsidered ? new Date().getTime() : undefined;
		dispatch(startTask(taskId, startDate, taskList, radioButtonTaskList));
	};
};

export default startTaskThunk;
