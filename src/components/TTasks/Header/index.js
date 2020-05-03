import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "./ProgressBar";
import "./styles.scss";
import t from '../language';
import {formatMinutes, formatTime} from "../../../utils/timeFormat";

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            all_time: 0,
            task_time: 0
        };

        this.timer = null;
    }

    componentDidMount() {
        if (this.props.currentTask > 0) {
            this.updateTimer();
            this.startTimer();
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.currentTask === 1 && this.timer === null) {
            this.updateTimer();
            this.startTimer();
        }
        if (nextProps.currentTask > 1) {
            if (!nextProps.timeOut && this.timer !== null) {
                //console.log(nextProps.timeOut, this.timer);
                clearInterval(this.timer);
                this.timer = null;
                this.setState({all_time: nextProps.all_time, task_time: 0});
            } else if (nextProps.timeOut && this.timer === null) {
                this.updateTimer();
                this.startTimer();
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentTask === 7) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    startTimer = () => {
        if (this.props.currentTask < 7) {
            this.timer = setInterval(() => {
                this.updateTimer()
            }, 1000)
        }
    };

    updateTimer = () => {
        const {start_time, taskTime} = this.props;
        let endTime = this.props.end_time || new Date().getTime();
        let all_time = endTime - start_time;

        let task_time = new Date().getTime() - taskTime;

        this.setState({all_time, task_time});
    };

    render() {
        const {all_time, task_time} = this.state;
        const {currentTask, leastTime, timeOut} = this.props;
        const showBar = [2, 3, 4, 5, 6].find(i => i === currentTask) !== undefined;
        return <div className={`header${!showBar ? " --under" : ""}`}>
            <div className="h-section h-left">
                {   !timeOut ? null :
                    <>
                    <span className={"text"}>{t.all_time}</span>
                    <span className={"time"}>{!all_time || currentTask === 0 ? formatTime(0) : formatTime(all_time)}</span>
                    </>
                }
            </div>
            <div className="h-section h-center">
                {   [4, 5].find(i => i === currentTask) !== undefined && !timeOut ?
                    <span className={"time -bold"}>{formatMinutes(leastTime)}</span> : null
                }
            </div>
            <div className="h-section h-right">
                {
                    currentTask === 7 ? null : !timeOut ? null :
                    <>
                    <span className={"text"}>{t.task_time}</span>
                    <span className={"time"}>{!all_time || currentTask === 0 ? formatTime(0) : formatTime(task_time)}</span>
                    </>
                }
            </div>
            {
                showBar ? <ProgressBar completed={(currentTask - 1) * 20}/> : null
            }
        </div>
    }
}

Header.propTypes = {
    start_time: PropTypes.number,
    taskTime: PropTypes.number,
    timeOut: PropTypes.bool,
    leastTime: PropTypes.number,
    currentTask: PropTypes.number
};

export default Header;
