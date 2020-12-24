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

//function resultStorage(state = initialState, action) {
function resultStorage(state = {}, action) {
	const {testState, test_id} = getTestState(state);

	switch (action.type) {
		case LOGIN:
			const { name, email, currentTestId, startDate } = action.payload;

			return {
				...state,
				[test_id] : {
					...testState,
					name: name,
					email: email,
					test_id: currentTestId,
					start_date: startDate,
				}
			};
			// return {
			// 	...state,
			// 	name: name,
			// 	email: email,
			// 	test_id: currentTestId,
			// 	start_date: startDate,
			// }
		case START_TASK:
			return {
				...state,
				[test_id]: getPreparedTask(testState, action)
			};
			//return getPreparedTask(state, action)
		case SET_TEXT_AREA_DATA:
			return {
				...state,
				[test_id]: update(testState, {
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
				})
			};
			// return update(state, {
			// 	results: {
			// 		[action.resultIndex]: {
			// 			data: {
			// 				[action.index]: {
			// 					answer: {
			// 						$set: action.payload,
			// 					},
			// 				},
			// 			},
			// 		},
			// 	},
			// });
		case SET_WORD_ANSWER:
			return {
				...state,
				[test_id]: update(testState, {
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
				})
			};
			// return update(state, {
			// 	results: {
			// 		[action.resultIndex]: {
			// 			data: {
			// 				[action.dataIndex]: {
			// 					answers: {
			// 						[action.answersIndex]: {
			// 							optionId: {
			// 								$set: action.payload,
			// 							},
			// 						},
			// 					},
			// 				},
			// 			},
			// 		},
			// 	},
			// });
		case SET_TASK_END_DATE:
			return {
				...state,
				[test_id]: update(testState, {
					results: {
						[action.resultIndex]: {
							end_date: {
								$set: action.payload,
							},
						},
					},
				})
			};
			// return update(state, {
			// 	results: {
			// 		[action.resultIndex]: {
			// 			end_date: {
			// 				$set: action.payload,
			// 			},
			// 		},
			// 	},
			// });
		case ADD_WELCOME_PAGE:
			return {
				...state,
				[test_id]: update(testState, {
					results: {
						$push: [
							{
								task_id: action.payload.taskId,
								start_date: action.payload.startDate,
							},
						],
					},
				})
			};
			// return update(state, {
			// 	results: {
			// 		$push: [
			// 			{
			// 				task_id: action.payload.taskId,
			// 				start_date: action.payload.startDate,
			// 			},
			// 		],
			// 	},
			// });
		case SET_TEST_END_DATE:
			return {
				...state,
				[test_id] : {
					...testState,
					end_date: action.payload.endDate
				}
			};
			//return { ...state, end_date: action.payload.endDate };
		default:
			return {
				...state,
				[test_id]: testState
			}
			// return state;
	}
}

const getTestState = (state) => {
	const [__empty__, test_id] = window.location.pathname.split('/');
	console.log('CHECK', state)
	if (state[test_id] === undefined) {
		state[test_id] = initialState;
	}

	return { testState: state[test_id], test_id}
};

export default resultStorage;
