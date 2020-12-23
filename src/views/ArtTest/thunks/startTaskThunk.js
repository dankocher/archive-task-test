import { startTask } from "../../../redux/actions/resultActions";
import {
	setCurrentSubTaskIndex,
	setMaxOpenedSubTaskIndex,
} from "../../../redux/actions/testActions";
import { QUSETION_ANSWER } from "../helpers/taskTypes";

import { getCurrentTime } from "../helpers/workWithApi";

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

		if (isTimeConsidered) {
			getCurrentTime().then((startDate) => {
				dispatch(
					startTask(taskId, startDate, taskList, task, radioButtonTaskList)
				);
			});
		} else {
			dispatch(
				startTask(taskId, undefined, taskList, task, radioButtonTaskList)
			);
		}
	};
};

export default startTaskThunk;
