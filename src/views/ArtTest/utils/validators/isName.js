export const isName = (name) => {
  const reg = /^[_a-zA-Zа-яА-Я0-9]*((-|\s|'|`)*[_a-zA-Zа-яА-Я0-9])*[\s]*$/g;
  // let reg = /^[a-zA-Zа-яА-Я]+(([',. -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
  if (reg.test(name)) return true;
  else return false;
};
