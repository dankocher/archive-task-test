import React from "react";
import t from "./language";
import "./RHeader.scss";
import {formatDate, formatTime} from "../../utils/timeFormat";

class RHeader extends React.Component {
    render() {
        const {user} = this.props;
        return <div className="r-header">
            <div className="u-name">{user.name}</div>
            <div className="u-email">{user.email}</div>
            <div className="u-date">{`${t.date} - ${formatDate(user.end_time)}`}</div>
            <div className="u-time">{`${t.all_time_test} - ${formatTime(user.end_time - user.start_time)}`}</div>
        </div>
    }
}

export default RHeader;