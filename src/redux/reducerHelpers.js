import update from "react-addons-update";

import { result } from "./initialStates";

export const getPreparedTask = (state, action) => {
	const { taskId, startData, taskList, radioButtonTaskList } = action.payload;

	state = update(state, {
		results: {
			$push: [
				{
					...result,
					task_id: taskId,
					start_date: startData,
				},
			],
		},
	});

	const resultIndex = state.results.length - 1;

	for (const question of taskList) {
		state = update(state, {
			results: {
				[resultIndex]: {
					data: {
						$push: [
							{
								id: question.id,
								answer: undefined,
							},
						],
					},
				},
			},
		});

		if (radioButtonTaskList != null) {
			state = setAnswers(state, resultIndex, radioButtonTaskList);
		}
	}

	return state;
};

const setAnswers = (state, resultIndex, radioButtonTaskList) => {
	const dataIndex = state.results[resultIndex].data.length - 1;

	if (state.results[resultIndex].data[dataIndex].answers == null) {
		state = state = update(state, {
			results: {
				[resultIndex]: {
					data: {
						[dataIndex]: {
							answers: {
								$set: [],
							},
						},
					},
				},
			},
		});
	}

	for (const radioButtonTask of radioButtonTaskList) {
		state = update(state, {
			results: {
				[resultIndex]: {
					data: {
						[dataIndex]: {
							answers: {
								$push: [{ optionListId: radioButtonTask.id }],
							},
						},
					},
				},
			},
		});
	}
	return state;
};
