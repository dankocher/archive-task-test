import React from "react";
import "./RTable.scss";
import t from "./language";

class RTable extends React.Component {

    render() {
        const {task} = this.props;
        return (
            <div className={'r-table'}>
                <div className="r-table-header">
                    <div className="task-time">{t.task_time}</div>
                    <div className="task-correct">{t.correct}</div>
                    <div className="task-error">{t.error}</div>
                    <div className="task-empty">{t.empty}</div>
                </div>
                <div className="r-table-results">
                    <div className="task-time">1:25</div>
                    <div className="task-correct">15</div>
                    <div className="task-error">4</div>
                    <div className="task-empty">0</div>
                </div>
            </div>
        );
    }
}
export default RTable;