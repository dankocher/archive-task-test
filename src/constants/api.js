const host = {
    uri: window.location.port === "3000" ? "https://wpdev.goodstudio.by" : "https://wp.goodstudio.by"
};

const api = {
    tt_save: {method: "POST", uri: "/api/test-task/save"},
    tt_user: {method: "POST", uri: "/api/test-task/user/:ttuid"},
    tt_status: {method: "GET", uri: "/api/test-task/status/:id"}
};


export { host, api };
