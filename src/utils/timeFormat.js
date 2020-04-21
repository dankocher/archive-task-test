
const formatMinutes = (seconds) => {
    let minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
    return `${formatTwo(minutes)}:${formatTwo(seconds)}`;
};
const formatTime = (milis) => {
    let seconds = parseInt(milis / 1000);
    let minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
    let hours = parseInt(minutes / 60);
    minutes = minutes % 60;
    return `${formatTwo(hours)}:${formatTwo(minutes)}:${formatTwo(seconds)}`;
};

const formatTwo = (value) => {
    return value < 10 ? `0${value}` : value;
};
const formatDate = (date) => {
    date = new Date(date);
    return `${formatTwo(date.getDate())}.${formatTwo(date.getMonth()+1)}.${date.getFullYear()}`;
};

export {formatDate, formatTime, formatMinutes};