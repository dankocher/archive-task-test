import ajax from "../utils/ajax";
import { api } from "../../../constants/api";

const getUrlId = () => {
	const [__empty__, test_id] = window.location.pathname.split("/");
	return test_id;
};

const _ID = "5f5f6162de1af368a21e299a";

export const getTaskIdListFromServer = async () => {
	const tt_id = getUrlId();
	const res = await ajax(api.td_get_tasks, { tt_id });
	if (!res.ok) {
		console.log("Bad response");
		return;
	}
	return res;
};

export const getTaskFromServer = async (_id) => {
	const tt_id = getUrlId();
	const res = await ajax(api.td_get_task, { tt_id, _id: _id });
	if (!res.ok) {
		console.log("Bad response");
		return;
	}
	return res;
};

export const saveResults = async (results) => {
	const res = await ajax(api.td_add_results, { result: results });
	if (!res.ok) {
		console.log("Bad response");
		return;
	}
	return res;
};
