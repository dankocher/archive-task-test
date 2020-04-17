const host = {
    uri: window.location.port === "3000" ? "https://wpdev.goodstudio.by" : "https://wp.goodstudio.by"
};

const api = {
    tt_save: {method: "POST", uri: "/api/test-task/save"},
    tt_user: {method: "POST", uri: "/api/test-task/user/:tt_user_id"}

};


export { host, api };
