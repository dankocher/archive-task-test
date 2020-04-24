import React from "react";
import "./styles.scss";
import RHeader from "./RHeader";
import Task1_1 from "../TTasks/Tasks/Task1/Task1_1";
import Task1_2 from "../TTasks/Tasks/Task1/Task1_2";
import Task2 from "../TTasks/Tasks/Task2";
import Task3 from "../TTasks/Tasks/Task3";
import Task4 from "../TTasks/Tasks/Task4";
import RTable from "./RTable";

class Results extends React.Component {

    nothing = () => {};

    getTable = index => {
        return <RTable index={index} task={this.props.user.tasks[index]}/>;
    };

    render() {
        const {user} = this.props;
        return <div className="results">
            <div className="results-container">
                <RHeader user={user}/>
                <Task1_1 result={user.tasks[2].result} finished={true} fResults={this.getTable(2)} onChange={this.nothing} timeOut={true} marginBottom={-13}/>
                <Task1_2 result={user.tasks[3].result} finished={true} fResults={this.getTable(3)} onChange={this.nothing} timeOut={true} marginBottom={-13}/>
                <Task2 result={user.tasks[4].result} finished={true} fResults={this.getTable(4)} onChange={this.nothing} timeOut={true} marginBottom={47}/>
                <Task3 result={user.tasks[5].result} finished={true} fResults={this.getTable(5)} onChange={this.nothing} timeOut={true} marginBottom={-28}/>
                <Task4 result={user.tasks[6].result} finished={true} fResults={null} onChange={this.nothing} timeOut={true} marginBottom={5}/>
            </div>
        </div>
    }
}

export default Results;