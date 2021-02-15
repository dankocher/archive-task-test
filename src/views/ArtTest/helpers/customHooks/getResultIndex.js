import { useSelector } from "react-redux";

export const useGetResultIndex = () => {
  const currentTestId = useSelector((state) => state.testStorage.currentTestId);

  const currentTest = useSelector((state) => state.testStorage[currentTestId]);

  const currentTaskIndex = currentTest.currentTaskIndex;

  const currentTaskId = currentTest.taskList[currentTaskIndex]._id;

  console.log(currentTaskId);

  return useSelector((state) => {
    const results = state.resultStorage[currentTestId].results;

    if (results == null || results.length === 0) return -1;
    return results.findIndex((element) => element.task_id === currentTaskId);
  });
};
