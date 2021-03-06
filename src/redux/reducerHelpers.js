import update from "react-addons-update";

import { result } from "./initialStates";

export const getPreparedTask = (state, action) => {
  const {
    currentTestId,
    taskId,
    startData,
    taskList,
    radioButtonTaskList,
    task,
  } = action.payload;

  state = update(state, {
    [currentTestId]: {
      results: {
        $push: [
          {
            ...result,
            task_id: taskId,
            start_date: startData,
            task: task,
          },
        ],
      },
    },
  });

  const resultIndex = state[currentTestId].results.length - 1;

  for (const question of taskList) {
    state = update(state, {
      [currentTestId]: {
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
      },
    });

    if (radioButtonTaskList != null) {
      state = setAnswers(
        state,
        resultIndex,
        radioButtonTaskList,
        currentTestId
      );
    }
  }

  return state;
};

const setAnswers = (state, resultIndex, radioButtonTaskList, currentTestId) => {
  const dataIndex = state[currentTestId].results[resultIndex].data.length - 1;

  if (
    state[currentTestId].results[resultIndex].data[dataIndex].answers == null
  ) {
    state = state = update(state, {
      [currentTestId]: {
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
      },
    });
  }

  for (const radioButtonTask of radioButtonTaskList) {
    state = update(state, {
      [currentTestId]: {
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
      },
    });
  }
  return state;
};

// export const sessionStart = (state, action) => {
//   const { tasksCounter, currentTestId, taskList } = action.payload;
//   if (
//     currentTestId in state &&
//     taskList in state[currentTestId] &&
//     tasksCounter in state[currentTestId]
//   ) {
//     state = {
//       ...state,
//       currentTestId,
//     };
//   } else {
//     state = {
//       ...state,
//       currentTestId,
//       [currentTestId]: { taskList, tasksCounter, isNextBtnClicked: false },
//     };
//   }
//   return state;
// };

export const login = (state, action) => {
  const { name, email, currentTestId, startDate } = action.payload;

  if (currentTestId in state) {
    return update(state, {
      [currentTestId]: {
        name: {
          $set: name.trim(),
        },
        email: {
          $set: email,
        },
        start_date: {
          $set: startDate,
        },
        results: { $set: [] },
      },
    });
  } else {
    return update(state, {
      $set: {
        [currentTestId]: {
          test_id: currentTestId,
          name: name.trim(),
          email,
          start_date: startDate,
          results: [],
        },
      },
    });
  }
};
