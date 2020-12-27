import { useSelector } from "react-redux";

export const useGetResultIndex = () => {
	// const taskId = useSelector((state) => state.testStorage.currentTaskId);
	const currentTestId = useSelector((state) => state.testStorage.currentTestId);
	const currentTaskId = useSelector(
		(state) => state?.testStorage?.[currentTestId]?.currentTaskId
	);

	return useSelector((state) => {
		// debugger;
		const results = state.resultStorage[currentTestId].results;
		// debugger;
		if (results == null || results.length === 0) return -1;
		return results.findIndex((element) => element.task_id === currentTaskId);
	});
};
