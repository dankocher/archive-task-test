import update from "react-addons-update";
import { getPreparedTask, login } from "../reducerHelpers";

import {
  LOGIN,
  START_TASK,
  SET_TEXT_AREA_DATA,
  SET_WORD_ANSWER,
  SET_TASK_END_DATE,
  ADD_WELCOME_PAGE,
  SET_TEST_END_DATE,
  DELETE_RESULT,
} from "../actions/resultActions";

import { initialState } from "../initialStates";

function resultStorage(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return login(state, action);
    case START_TASK:
      return getPreparedTask(state, action);
    case SET_TEXT_AREA_DATA:
      return update(state, {
        [action.currentTestId]: {
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
        },
      });
    case SET_WORD_ANSWER:
      return update(state, {
        [action.currentTestId]: {
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
        },
      });
    case SET_TASK_END_DATE:
      return update(state, {
        [action.currentTestId]: {
          results: {
            [action.resultIndex]: {
              end_date: {
                $set: action.payload,
              },
            },
          },
        },
      });
    case ADD_WELCOME_PAGE:
      return update(state, {
        [action.currentTestId]: {
          results: {
            $push: [
              {
                task_id: action.payload.taskId,
                start_date: action.payload.startDate,
              },
            ],
          },
        },
      });
    case SET_TEST_END_DATE:
      return update(state, {
        [action.currentTestId]: {
          end_date: { $set: action.payload },
        },
      });
    // return { ...state, end_date: action.payload };
    case DELETE_RESULT:
      const currentTestIdLocal = action.payload;
      const { [currentTestIdLocal]: value, ...newState } = state;
      return newState;

    default:
      return state;
  }
}

export default resultStorage;
