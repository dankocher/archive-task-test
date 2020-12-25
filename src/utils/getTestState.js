export const getTestState = (state, initialState) => {
    const [__empty__, test_id] = window.location.pathname.split('/');
    //console.log('CHECK', state)
    if (state[test_id] === undefined && initialState) {
        state[test_id] = initialState;
    }

    return { testState: state[test_id], test_id}
};
