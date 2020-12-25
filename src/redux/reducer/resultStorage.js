import update from "react-addons-update";
import { getPreparedTask } from "../reducerHelpers";
import {getTestState} from "../../utils/getTestState";

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
//function resultStorage(state = {}, action) {
	//const {testState, test_id} = getTestState(state, initialState);

	switch (action.type) {
		case LOGIN:
			//console.log('login', state)
			const { name, email, currentTestId, startDate } = action.payload;

			// return {
			// 	...state,
			// 	[test_id] : {
			// 		...testState,
			// 		name: name,
			// 		email: email,
			// 		test_id: currentTestId,
			// 		start_date: startDate,
			// 	}
			// };
			return {
				...state,
				name: name,
				email: email,
				test_id: currentTestId,
				start_date: startDate,
			}
		case START_TASK:
			// console.log('star_task', state)
			// return {
			// 	...state,
			// 	[test_id]: getPreparedTask(testState, action)
			// };
			return getPreparedTask(state, action)
		case SET_TEXT_AREA_DATA:
			// console.log('set_text_area_data', state)
			// return update(state, {
			// 	[test_id]: {
			// 		results: {
			// 			[action.resultIndex]: {
			// 				data: {
			// 					[action.index]: {
			// 						answer: {
			// 							$set: action.payload,
			// 						},
			// 					},
			// 				},
			// 			},
			// 		},
			// 	}
			// 	})
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
			// console.log('set_word_answer', state)
			// return update(state, {
			// 	[test_id]: {
			// 		results: {
			// 			[action.resultIndex]: {
			// 				data: {
			// 					[action.dataIndex]: {
			// 						answers: {
			// 							[action.answersIndex]: {
			// 								optionId: {
			// 									$set: action.payload,
			// 								},
			// 							},
			// 						},
			// 					},
			// 				},
			// 			},
			// 		},
			// 	}
			// 	})
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
			// console.log('set_task_end_date', state)
			// return update(state, {
			// 	[test_id]: {
			// 		results: {
			// 			[action.resultIndex]: {
			// 				end_date: {
			// 					$set: action.payload,
			// 				},
			// 			},
			// 		},
			// 	}
			// 	})
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
			// console.log('add_welcome_page', state)
			// return update(state, {
			// 	[test_id]: {
			// 		results: {
			// 			$push: [
			// 				{
			// 					task_id: action.payload.taskId,
			// 					start_date: action.payload.startDate,
			// 				},
			// 			],
			// 		},
			// 	}
			// 	})
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
			// console.log('set_test_end_date', state)
			// return {
			// 	...state,
			// 	[test_id] : {
			// 		...testState,
			// 		end_date: action.payload.endDate
			// 	}
			// };
			return { ...state, end_date: action.payload.endDate };
		default:
			//console.log('default', state)
			return state
	}
}

export default resultStorage;
