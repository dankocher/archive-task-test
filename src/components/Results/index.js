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

const __user__ = {
    "_id":"5ea012d5538efe4c214f8912",
    "name":"Вадим Рудаков",
    "email":"Avenirlatrov@gmail.com",
    "start_time":1587548884822,
    "date":1587548885328,
    "tasks":[
        {
            "_id":"5ea013bd538efe4c214f8940",
            "start_time":1587548799396,
            "end_time":1587548884822
        },
        {
            "_id":"5ea013bd538efe4c214f893f",
            "start_time":1587548884822,
            "end_time":1587548886834
        },
        {
            "_id":"5ea013bd538efe4c214f893e",
            "start_time":1587548886834,
            "result":{
                "black":["е      ","ж","д","к","п","у"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
                "red":["е","ж","д","к","п","у","в"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "]
            },
            "end_time":1587548942840
        },
        {
            "_id":"5ea013bd538efe4c214f893d",
            "start_time":1587548942840,
            "result":{
                "red":["е","ж","д","к","п","к","у","в"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
                "black":["е","ж","д","к","п","к","у"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "]
            },
            "end_time":1587548987083
        },
        {
            "_id":"5ea013bd538efe4c214f893c",
            "start_time":1587548993085,
            "result":{
                "words":["Лето           ","Время","Богатство","Лето"," "]
            },
            "end_time":1587549015121
        },
        {
            "_id":"5ea013bd538efe4c214f893b",
            "start_time":1587549021123,
            "result":{"0":{"number":"0","text":"яйцо"},"1":{"number":"1","text":"свеча"},"2":{"number":"2","text":""},"3":{"number":"","text":""},"4":{"number":"","text":""},"5":{"number":"5","text":"детская горка"},"6":{"number":"","text":""},"7":{"number":"","text":""},"8":{"number":"","text":""},"9":{"number":"9","text":"воздушный шарик"}},"end_time":1587549085806},{"_id":"5ea013bd538efe4c214f893a","start_time":1587549085806,"result":{"0":{"captions":"Введите заголовки","words":"Введите ключевые слова"},"1":{"captions":"","words":""},"2":{"captions":"","words":""},"3":{"captions":"","words":""},"4":{"captions":"","words":""}},"end_time":1587549117514},{"_id":"5ea013bd538efe4c214f8939","start_time":1587549117514}],"end_time":1587549117514,"favorite":true}

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