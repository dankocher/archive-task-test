import update from "react-addons-update";
import { getPreparedTask } from "../reducerHelpers";

import {
	LOGIN,
	START_TASK,
	SET_TEXT_AREA_DATA,
	SET_WORD_ANSWER,
	SET_TASK_END_DATE,
	ADD_WELCOME_PAGE,
	SET_TEST_END_DATE,
} from "../actions/resultActions";

import { initialState } from "../initialStates";

function resultStorage(state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				name: action.payload.name,
				email: action.payload.email,
				test_id: action.payload.currentTestId,
				start_date: new Date().getTime(),
			};
		case START_TASK:
			return getPreparedTask(state, action);
		case SET_TEXT_AREA_DATA:
			return update(state, {
				results: {
					[action.resultIndex]: {
						data: {
							[action.index]: {
								answer: {
									$set: action.payload,
								},
							},
						},
					},
				},
			});
		case SET_WORD_ANSWER:
			return update(state, {
				results: {
					[action.resultIndex]: {
						data: {
							[action.dataIndex]: {
								answers: {
									[action.answersIndex]: {
										optionId: {
											$set: action.payload,
										},
									},
								},
							},
						},
					},
				},
			});
		case SET_TASK_END_DATE:
			return update(state, {
				results: {
					[action.resultIndex]: {
						end_date: {
							$set: action.payload,
						},
					},
				},
			});
		case ADD_WELCOME_PAGE:
			return update(state, {
				results: {
					$push: [
						{
							task_id: action.payload.taskId,
							start_date: action.payload.startDate,
						},
					],
				},
			});
		case SET_TEST_END_DATE:
			return { ...state, end_date: new Date().getTime() };
		default:
			return state;
	}
}

export default resultStorage;
