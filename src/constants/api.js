const host = {
	uri:
		window.location.host === "test.goodstudio.by"
			? "https://wp.goodstudio.by"
			: "https://wpdev.goodstudio.by",
};

const api = {
	//attention-test
	tt_save: { method: "POST", uri: "/api/test-task/save" },
	tt_user: { method: "POST", uri: "/api/test-task/user/:ttuid" },
	tt_status: { method: "GET", uri: "/api/test-task/status/:id" },

	//art-test
	td_get_tasks: { method: "GET", uri: "/api/td/get/list/:tt_id" },
	td_get_task: { method: "GET", uri: "/api/td/get/:tt_id/:_id" },
	td_add_results: { method: "POST", uri: "/api/td/results/add" },
	get_time: { method: "GET", uri: "/api/get_time" },
};

export { host, api };
