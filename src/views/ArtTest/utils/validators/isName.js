export const isName = (name) => {
	let reg = /^[a-zA-Zа-яА-Я]+(([',. -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
	if (reg.test(name)) return true;
	else return false;
};
