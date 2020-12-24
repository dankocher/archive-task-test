import { useSelector } from "react-redux";

const [__empty__, test_id] = window.location.pathname.split('/')

export const useGetResultIndex = () => {
	const taskId = useSelector((state) => state.testStorage.currentTaskId);
	return useSelector((state) => {
		//const results = state.resultStorage.results;
		const results = state.resultStorage[test_id].results;
		if (results == null || results.length === 0) return -1;
		return results.findIndex((element) => element.task_id === taskId);
	});
};
