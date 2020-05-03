import React from "react";
import "./styles.scss";
import RHeader from "./RHeader";
import Task1_1 from "../TTasks/Tasks/Task1/Task1_1";
import Task1_2 from "../TTasks/Tasks/Task1/Task1_2";
import Task2 from "../TTasks/Tasks/Task2";
import Task3 from "../TTasks/Tasks/Task3";
import Task4 from "../TTasks/Tasks/Task4";
import RTable from "./RTable";
import checkResults from "./checkResults";

const __user__ = {"_id":"5eaecd0fb20755216ce63c24","name":"DENIS_TEST","email":"daskdj@asd.coas","start_time":1588514063325,"date":1588514063135,"tasks":[{"_id":"5eaece94b20755216ce63c52","start_time":1588514036970,"end_time":1588514063325},{"_id":"5eaece94b20755216ce63c51","start_time":1588514063325,"end_time":1588514064461},{"_id":"5eaece94b20755216ce63c50","start_time":1588514064461,"result":{"black":["е","х","и","ц","о","8","8","1","2","н","3","8","н","ф","ы","в","р","л","р","в","ф","б","ш","г"],"red":["я","е","м","о","д","ф","ы","в","2","3","1","в","ф","ы","в","ф","ы","в","й","ц","у","у","у","и","г"]},"end_time":1588514148135},{"_id":"5eaece94b20755216ce63c4f","start_time":1588514148135,"result":{"red":["р","в","ч","ф","в","ы","ф","в","ы","ф","в","ы","ф","в","ы","ф","в","ы","ф","в","ы","ф","в","ы","к"],"black":["о","л","с","ы","ф","в","ы","ф","в","ы","ф","в","ы","ф","в","ы","ф","в","ы","ф","в","ы","ы","ч"]},"end_time":1588514208775},{"_id":"5eaece94b20755216ce63c4e","start_time":1588514279783,"result":{"words":["Лето","Бремя",null,"Жизнь ",null,"фывфывфв",null,"Ужин",null,"фывфыв",null,"скука",null,"141фывфыв",null,"в12312431"]},"end_time":1588514315856},{"_id":"5eaece94b20755216ce63c4d","start_time":1588514386862,"result":{"0":{"number":"0","text":"детская горка"},"1":{"number":"54","text":""},"2":{"number":"","text":""},"3":{"number":"","text":"1рвфывпфрывпнфвпво"},"4":{"number":"66","text":""},"5":{"number":"5 ","text":""},"6":{"number":"","text":"123   "},"7":{"number":"","text":"овраг"},"8":{"number":"31","text":"снеговик   "},"9":{"number":"","text":"воздушный шарик"}},"end_time":1588514448286},{"_id":"5eaece94b20755216ce63c4c","start_time":1588514448286,"end_time":1588514452878},{"_id":"5eaece94b20755216ce63c4b","start_time":1588514452878}],"end_time":1588514452878}


class Results extends React.Component {



    nothing = () => {};

    getTable = index => {
        return <RTable index={index} task={
            this.props.user.tasks[index]
            //__user__.tasks[index]
        }/>;
    };

    render() {
        const {user} = this.props;
        //const user = __user__;
        return <div className="results">
            <div className="results-container">
                <RHeader user={user}/>
                <Task1_1 result={user.tasks[2].result} checking={checkResults(2, user.tasks[2])} finished={true} fResults={this.getTable(2)} onChange={this.nothing} timeOut={true} marginBottom={-13}/>
                <Task1_2 result={user.tasks[3].result} checking={checkResults(3, user.tasks[3])} finished={true} fResults={this.getTable(3)} onChange={this.nothing} timeOut={true} marginBottom={-13}/>
                <Task2 result={user.tasks[4].result} checking={checkResults(4, user.tasks[4])} finished={true} fResults={this.getTable(4)} onChange={this.nothing} timeOut={true} marginBottom={47}/>
                <Task3 result={user.tasks[5].result} checking={checkResults(5, user.tasks[5])} finished={true} fResults={this.getTable(5)} onChange={this.nothing} timeOut={true} marginBottom={-28}/>
                <Task4 result={user.tasks[6].result} finished={true} fResults={null} onChange={this.nothing} timeOut={true} marginBottom={5}/>
            </div>
        </div>
    }
}

export default Results;