import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "./ProgressBar";
import "./styles.scss";
import t from '../language';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            all_time: 0
        }
    }

    componentDidMount() {
        this.updateTimer();
        if (this.props.currentTask < 7) {
            this.timer = setInterval(() => {
                this.updateTimer()
            }, 1000)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentTask === 7) {
            clearInterval(this.timer)
        }
    }

    updateTimer = () => {
        const {start_time} = this.props;
        let endTime = this.props.end_time || new Date().getTime();
        let all_time = endTime - start_time;
        this.setState({all_time});
    }

    render() {
        const {all_time, task_time} = this.state;
        const {currentTask} = this.props;
        const showBar = [2, 3, 4, 5, 6].find(i => i === currentTask) !== undefined;
        return <div className={`header${!showBar ? " --under" : ""}`}>
            <div className="h-section h-left">
                <span className={"text"}>{t.all_time}</span>
                <span className={"time"}>{formatTime(all_time)}</span>
            </div>
            <div className="h-section h-center">
                {   [4, 5].find(i => i === currentTask) !== undefined ?
                    <span className={"time"}>{formatMinutes(0)}</span> : null
                }
            </div>
            <div className="h-section h-right">
                <span className={"text"}>{t.task_time}</span>
                <span className={"time"}>{"00:00:00"}</span>
            </div>
            {
                showBar ? <ProgressBar completed={(currentTask - 1) * 20}/> : null
            }
        </div>
    }
}

Header.propTypes = {
    start_time: PropTypes.number.isRequired,
    taskTime: PropTypes.number,
    leastTime: PropTypes.number,
    currentTask: PropTypes.number
};

export default Header;

const formatMinutes = (milis) => {
    let seconds = parseInt(milis / 1000);
    let minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
    return `${formatTwo(minutes)}:${formatTwo(seconds)}`;
};
const formatTime = (milis) => {
    let seconds = parseInt(milis / 1000);
    let minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
    let hours = parseInt(minutes / 60);
    return `${formatTwo(hours)}:${formatTwo(minutes)}:${formatTwo(seconds)}`;
};

const formatTwo = (value) => {
    return value < 10 ? `0${value}` : value;
}