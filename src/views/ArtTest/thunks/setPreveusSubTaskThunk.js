import { setCurrentSubTaskIndex } from "../../../redux/actions/testActions";

const setPreveusSubTaskThunk = () => {
  return (dispatch, getState) => {
    const state = getState();

    const currentTestId = state.testStorage.currentTestId;

    const currentSubTaskIndex =
      state.testStorage[currentTestId].currentSubTaskIndex;

    if (currentSubTaskIndex === 0) return;
    dispatch(setCurrentSubTaskIndex(currentSubTaskIndex - 1));
  };
};

export default setPreveusSubTaskThunk;
