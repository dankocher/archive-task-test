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

    getTable = task => {
        task = this.props.user.tasks[task];
        return <RTable task={task}/>;
    };

    render() {
        const {user} = this.props;
        return <div className="results">
            <div className="results-container">
                <RHeader user={user}/>
                <Task1_1 result={user.tasks[2].result} finished={true} fResults={this.getTable(2)} onChange={this.nothing} timeOut={true}/>
                <Task1_2 result={user.tasks[3].result} finished={true} fResults={this.getTable(2)} onChange={this.nothing} timeOut={true}/>
                <Task2 result={user.tasks[4].result} finished={true} fResults={this.getTable(2)} onChange={this.nothing} timeOut={true}/>
                <Task3 result={user.tasks[5].result} finished={true} fResults={this.getTable(2)} onChange={this.nothing} timeOut={true}/>
                <Task4 result={user.tasks[6].result} finished={true} fResults={null} onChange={this.nothing} timeOut={true}/>
            </div>
        </div>
    }
}

export default Results;