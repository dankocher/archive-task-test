import {
	SET_IMAGE_LENGTH,
	POSITIVE_ITERATE_IMAGE_INDEX,
	NEGATIVE_ITERATE_IMAGE_INDEX,
	SET_IMAGE_INDEX,
	SET_IS_HIDDEN_PHOTOMODAL,
	SET_SCALE_COUNTER,
} from "../actions/caruselActions";

const initialState = {
	length: 0,
	current: 0,
	isHiddenPhotoModal: true,
	scaleCounter: 0,
};

function caruselReducer(state = initialState, action) {
	switch (action.type) {
		case SET_IMAGE_LENGTH:
			return { ...state, length: action.payload };
		case POSITIVE_ITERATE_IMAGE_INDEX:
			if (state.current + 1 === state.length) {
				return { ...state, current: 0 };
			}
			return { ...state, current: state.current + 1 };
		case NEGATIVE_ITERATE_IMAGE_INDEX:
			if (state.current - 1 < 0) {
				return { ...state, current: state.length - 1 };
			}
			return { ...state, current: state.current - 1 };
		case SET_IMAGE_INDEX:
			return { ...state, current: action.payload };
		case SET_IS_HIDDEN_PHOTOMODAL:
			return { ...state, isHiddenPhotoModal: !state.isHiddenPhotoModal };
		case SET_SCALE_COUNTER:
			return { ...state, scaleCounter: action.payload };
		default:
			return state;
	}
}

export default caruselReducer;
