import React from "react";
import t from "./language";
import "./RHeader.scss";
import {formatDate, formatTime} from "../../utils/timeFormat";

class RHeader extends React.Component {

    makeFormat = (date) => {
      if (date) {
          let n = new Date().getTimezoneOffset();

          return date + (n * 3600 * 1000)/-60
      }
    };

    render() {
        const {user} = this.props;
        return <div className="r-header">
            <div className="u-name">{user.name}</div>
            <div className="u-email">{user.email}</div>
            <div className="u-date">{`${t.date} - ${formatDate(this.makeFormat(user.end_date) || user.end_time)}`}</div>
            <div className="u-time">{`${t.all_time_test} - ${formatTime(user.end_time - user.start_time)}`}</div>
        </div>
    }
}

export default RHeader;