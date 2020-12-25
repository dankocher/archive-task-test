import { useSelector } from "react-redux";

const FROM = 1;
const TO = 2000;
const [__empty__, test_id] = window.location.pathname.split('/');

export const useGetResponseLimitation = () => {
	const isAnswerSizeLimited = useSelector(
		(state) => state.testStorage.currentTask.data.isAnswerSizeLimited
		//(state) => state.testStorage.currentTask.data.isAnswerSizeLimited
	);
	const responseLimitation = useSelector(
		(state) => state.testStorage.currentTask.data.responseLimitation
		//(state) => state.testStorage.currentTask.data.responseLimitation
	);

	if (isAnswerSizeLimited) {
		return {
			from: responseLimitation?.from || FROM,
			to: responseLimitation?.to || TO,
		};
	} else {
		return {
			from: FROM,
			to: TO,
		};
	}
};
