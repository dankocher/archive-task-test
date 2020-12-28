import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { purgeStoredState } from "redux-persist";

import caruselReducer from "./caruselReducer";
import testStorage from "./testStorage";
import resultStorage from "./resultStorage";
import rehydrateStorage from "./rehydrate";

import { DESTROY_SESSION } from "../actions/rootActions";

export const persistConfig = {
  key: "root",
  storage,
  blacklist: ["caruselReducer", "testStorage"],
};

export const testStoragePersistConfig = {
  key: "testStorage",
  storage,
  blacklist: ["taskList", "currentTestId", "currentTask"],
};

const rootReducer = combineReducers({
  resultStorage,
  testStorage: persistReducer(testStoragePersistConfig, testStorage),
  caruselReducer,
  rehydrateStorage,
});

// const rootReducer = (state, action) => {
//   // Clear all data in redux store to initial.

//   if (action.type === DESTROY_SESSION) {
//     const currentTestId = state.testStorage.currentTestId;
//     // purgeStoredState(persistConfig);
//     // purgeStoredState(testStoragePersistConfig);
//     delete state.testStorage[currentTestId];
//     delete state.resultStorage[currentTestId];
//     // window.location.reload();
//   }
//   debugger;
//   console.log(state);
//   // return appReducer(state, action);
// };

export default persistReducer(persistConfig, rootReducer);
