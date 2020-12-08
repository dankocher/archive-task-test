import { REHYDRATE } from "../actions/rehydrateActions";

const initialState = {
	isRehydrated: false,
};

function rehydrateStorage(state = initialState, action) {
	switch (action.type) {
		case REHYDRATE:
			return { ...state, isRehydrated: true };
		default:
			return state;
	}
}

export default rehydrateStorage;
