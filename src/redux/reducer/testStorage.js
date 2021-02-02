import update from "react-addons-update";
import {
  SET_CURRENT_TASK_INDEX,
  SET_IS_NEXT_BUTTON_CLICKED,
  SET_CURRENT_SUBTASK_INDEX,
  SET_MAX_OPENED_SUBTASK_INDEX,
  SESSION_START,
  DELETE_TEST,
  SET_CURRENT_TIME,
  SET_CURRENT_TEST_ID,
} from "../actions/testActions";

import { sessionStart } from "../reducerHelpers";

const initialState = {
  // taskList: [],
  // currentTaskId: "5f720a047e5e6f4b670dfb5a",
  currentTestId: undefined,
  // currentTaskId: undefined,
  // currentTask: undefined,
  // isNextBtnClicked: false,
  // currentSubTaskIndex: undefined,
  // maxOpenedSubTaskIndex: undefined,
  // lastTaskNumber: undefined,
};

function testStorage(state = initialState, action) {
  switch (action.type) {
    case SESSION_START:
      const { tasksCounter, currentTestId, taskList } = action.payload;
      return {
        ...state,
        currentTestId,
        [currentTestId]: { taskList, tasksCounter, isNextBtnClicked: false },
      };
    case SET_CURRENT_TEST_ID:
      return {
        ...state,
        currentTestId: action.currentTestId,
      };

    case SET_CURRENT_TASK_INDEX:
      return update(state, {
        [state.currentTestId]: {
          currentTaskIndex: { $set: action.payload },
        },
      });

    // case SET_CURRENT_TASK:
    //   return { ...state, currentTask: action.payload };

    case SET_IS_NEXT_BUTTON_CLICKED:
      return update(state, {
        [state.currentTestId]: {
          isNextBtnClicked: { $set: action.payload },
        },
      });

    case SET_CURRENT_SUBTASK_INDEX:
      return update(state, {
        [state.currentTestId]: {
          currentSubTaskIndex: { $set: action.payload },
        },
      });

    case SET_MAX_OPENED_SUBTASK_INDEX:
      return update(state, {
        [state.currentTestId]: {
          maxOpenedSubTaskIndex: { $set: action.payload },
        },
      });

    case SET_CURRENT_TIME:
      return update(state, {
        currentTime: {
          $set: action.payload,
        },
      });

    case DELETE_TEST:
      const currentTestIdLocal = action.payload;
      const { [currentTestIdLocal]: value, ...newState } = state;
      return { ...newState, currentTestId: undefined };

    default:
      return state;
  }
}

export default testStorage;
