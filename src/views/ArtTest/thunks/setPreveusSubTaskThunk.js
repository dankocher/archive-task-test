import { setCurrentSubTaskIndex } from "../../../redux/actions/testActions";

const setPreveusSubTaskThunk = (currentResultIndex) => {
	return (dispatch, getState) => {
		const state = getState();

		const currentSubTaskIndex = state.testStorage.currentSubTaskIndex;

		if (currentSubTaskIndex === 0) return;
		dispatch(setCurrentSubTaskIndex(currentSubTaskIndex - 1));
	};
};

export default setPreveusSubTaskThunk;
