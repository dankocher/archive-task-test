import { useSelector } from "react-redux";

const FROM = 1;
const TO = 9999;

export const useGetResponseLimitation = () => {
  const currentTestId = useSelector((state) => state.testStorage.currentTestId);
  const currentTaskIndex = useSelector(
    (state) => state.testStorage?.[currentTestId]?.currentTaskIndex
  );

  const task = useSelector(
    (state) => state.testStorage[currentTestId]?.taskList?.[currentTaskIndex]
  );
  const isAnswerSizeLimited = task.data.isAnswerSizeLimited;

  const responseLimitation = task.data.responseLimitation;

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
