import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import caruselReducer from "./caruselReducer";
import testStorage from "./testStorage";
import resultStorage from "./resultStorage";
import rehydrateStorage from "./rehydrate";

export const persistConfig = {
  key: "root",
  storage,
  blacklist: ["caruselReducer", "testStorage"],
};

export const testStoragePersistConfig = {
  key: "testStorage",
  storage,
  blacklist: ["currentTime", "isLoading"],
};

const rootReducer = combineReducers({
  resultStorage,
  testStorage: persistReducer(testStoragePersistConfig, testStorage),
  caruselReducer,
  rehydrateStorage,
});

export default persistReducer(persistConfig, rootReducer);
