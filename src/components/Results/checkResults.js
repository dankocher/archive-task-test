import {formatMinutes} from "../../utils/timeFormat";

const checkTask1 = (index, result) => {
    const BLACK = {
        2: "е,х,и,ц,о,д,у,м,ж,с,к,т,ч,п,в,н,з,л,р,а,ф,б,ш,г",
        3: "о,л,с,з,и,ж,х,г,м,в,к,б,ш,ц,п,е,р,т,а,н,у,д,ф,ч"
    };
    const RED = {
        2: "я,е,м,о,д,п,ф,с,б,ц,з,ш,н,х,т,а,к,ч,ж,р,у,в,л,и,г",
        3: "р,в,ч,п,н,б,т,о,а,х,л,ф,ж,м,р,е,т,ц,з,с,ш,д,и,г,к"
    };
    let model = [...BLACK[index].split(","), ...RED[index].split(",")];
    let toCheck = [...result.black, ...result.red];
    return compareArray(model, toCheck);
};

const checkTask2 = (result) => {
    const words = "лето,бремя,богатство,жизнь,холод,терпеливость,свобода,ужин,надёжность,вальс,энергия,скука,справедливость,движение,досада,надежда,виновность,счастье".split(",");
    return compareArray(words, result.words);
};

const checkTask3 = (result) => {
    let model = "0,1,2,3,4,5,6,7,8,9,яйцо,свеча,утка,птица,парусник,детская горка,змея,овраг,снеговик,воздушный шарик".split(",");

    result = Object.entries(result).map(r => r[1]);
    let _numbers = result.map(r => r.number);
    let _text = result.map(r => r.text);
    return compareArray(model, [..._numbers, ..._text]);
};


const compareArray = (model, data) => {
    // console.log(data);
    let correct = 0, error = 0, empty = 0;
    for (let i = 0; i < model.length; i++) {
        if (data[i] === "" || data[i] === undefined || data[i] === null) {
            empty++;
            error++;
            continue;
        }

        if (model[i].toLocaleLowerCase() === data[i].toLocaleLowerCase()) {
            correct++;
        } else {
            error++;
        }
    }
    return {correct, error, empty};
};

const checkResults = (index, task) => {
    const time = formatMinutes(parseInt((task.end_time - task.start_time) / 1000));

    switch (index) {
        case 2: case 3:
            return {time, ...checkTask1(index, task.result)};
        case 4:
            return {time, ...checkTask2(task.result)};
        case 5:
            return {time, ...checkTask3(task.result)};
        default:
            return {time, correct: 0, error: 0, empty: 0}
    }
};

export default checkResults;