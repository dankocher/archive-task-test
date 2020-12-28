export const getUrlId = () => {
	const [_, test_id] = window.location.pathname.split("/");
	return test_id;
};
