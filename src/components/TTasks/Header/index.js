import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

import t from '../language';

class Header extends React.Component {

    render() {
        return <div className="header">
            <div className="h-section h-left">
                <span className={"text"}>{t.all_time}</span>
                <span className={"time"}>{"00:00:00"}</span>
            </div>
            <div className="h-section h-center">
                <span className={"time"}>{"00:00:00"}</span>
            </div>
            <div className="h-section h-right">
                <span className={"text"}>{t.task_time}</span>
                <span className={"time"}>{"00:00:00"}</span>
            </div>
        </div>
    }
}

Header.propTypes = {
    start_time: PropTypes.number,
    taskTime: PropTypes.number,
    leastTime: PropTypes.number
};

export default Header;