import { useSelector } from "react-redux";

const FROM = 1;
const TO = 2000;

export const useGetResponseLimitation = () => {
	const isAnswerSizeLimited = useSelector(
		(state) => state.testStorage.currentTask.data.isAnswerSizeLimited
	);
	const responseLimitation = useSelector(
		(state) => state.testStorage.currentTask.data.responseLimitation
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
