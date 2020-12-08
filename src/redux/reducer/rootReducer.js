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
	blacklist: ["testStorage", "caruselReducer"],
};

export const testStoragePersistConfig = {
	key: "testStorage",
	storage: storage,
	whitelist: [
		"currentTaskId",
		"isNextBtnClicked",
		"currentSubTaskIndex",
		"maxOpenedSubTaskIndex",
	],
};

const appReducer = combineReducers({
	resultStorage,
	testStorage: persistReducer(testStoragePersistConfig, testStorage),
	caruselReducer,
	rehydrateStorage,
});

const rootReducer = (state, action) => {
	// Clear all data in redux store to initial.
	if (action.type === DESTROY_SESSION) {
		purgeStoredState(persistConfig);
		purgeStoredState(testStoragePersistConfig);
		state = undefined;
		window.location.reload();
	}

	return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
