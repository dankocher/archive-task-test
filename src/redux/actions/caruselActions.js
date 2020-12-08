export const SET_IMAGE_LENGTH = "SET_IMAGE_LENGTH";
export const SET_IMAGE_INDEX = "SET_IMAGE_INDEX";
export const POSITIVE_ITERATE_IMAGE_INDEX = "POSITIVE_ITERATE_IMAGE_INDEX";
export const NEGATIVE_ITERATE_IMAGE_INDEX = "NEGATIVE_ITERATE_IMAGE_INDEX";
export const SET_IS_HIDDEN_PHOTOMODAL = "SET_IS_HIDDEN_PHOTOMODAL";
export const SET_SCALE_COUNTER = "SET_SCALE_COUNTER";

export const setImageLength = (length) => ({
	type: SET_IMAGE_LENGTH,
	payload: length,
});

export const setImageIndex = (number) => ({
	type: SET_IMAGE_INDEX,
	payload: number,
});

export const positiveIterateImageIndex = () => ({
	type: POSITIVE_ITERATE_IMAGE_INDEX,
});

export const negativeIterateImageIndex = () => ({
	type: NEGATIVE_ITERATE_IMAGE_INDEX,
});

export const setIsHiddenPhotoModal = () => ({
	type: SET_IS_HIDDEN_PHOTOMODAL,
});

export const setScaleCounter = (scaleCounter) => ({
	type: SET_SCALE_COUNTER,
	payload: scaleCounter,
});
