import { host } from "../../../constants/api";

export const getImgPath = (filename) => {
	return `${host.uri}/api/pic/get/${filename}`;
};
