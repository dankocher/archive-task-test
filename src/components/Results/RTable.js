import React from "react";
import "./RTable.scss";
import t from "./language";
import checkResults from "./checkResults";

class RTable extends React.Component {

    state = {
        time: " ",
        correct: " ",
        error: " ",
        empty: " "
    };

    componentDidMount() {
        const {index, task} = this.props;
        const results = checkResults(index, task);
        this.setState({...results});
    }

    render() {
        const {time, correct, error, empty} = this.state;
        return (
            <div className={'r-table'}>
                <div className="r-table-header">
                    <div className="task-time">{t.task_time}</div>
                    <div className="task-correct">{t.correct}</div>
                    <div className="task-error">{t.error}</div>
                    <div className="task-empty">{t.empty}</div>
                </div>
                <div className="r-table-results">
                    <div className="task-time">{time}</div>
                    <div className="task-correct">{correct}</div>
                    <div className="task-error">{error}</div>
                    <div className="task-empty">{empty}</div>
                </div>
            </div>
        );
    }
}
export default RTable;