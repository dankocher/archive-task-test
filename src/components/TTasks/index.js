import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Header from "./Header";
import t from "./language";
import Task0 from "./Tasks/Task0";
import Loader from "../Loader";

import TestTask from "./Tasks/TestTask";
import FinishPage from "./Tasks/FinishPage";
import Task1_1 from "./Tasks/Task1/Task1_1";
import Task1_2 from "./Tasks/Task1/Task1_2";
import Task2 from "./Tasks/Task2";

const MAX_TIMEOUT = 5;

const defaultState = {
    currentTask: 0,
    nextEnabled: true,
    timeOut: true,
    completedTask: false,
    leastTime: MAX_TIMEOUT
};

class TTasks extends React.Component {

    constructor(props) {
        super(props);

        const length = props.user.tasks.length;

        this.state = {
            ...defaultState,
            currentTask: length === 0 ? 0 : length < 8 ? length-1 : 7,
            user: props.user
        }
    }

    componentDidMount() {
        this.checkRestart();
    }

    checkRestart = async () => {
        const {user, currentTask} = this.state;
        if (currentTask === 4 || currentTask === 5) {
            if ((new Date().getTime() - user.tasks[currentTask].start_time) / 1000 < MAX_TIMEOUT) {
                console.log(MAX_TIMEOUT - (new Date().getTime() - user.tasks[currentTask].start_time) / 1000)
                await this.setState({
                    timeOut: false,
                    leastTime: parseInt(MAX_TIMEOUT - (new Date().getTime() - user.tasks[currentTask].start_time) / 1000)
                });
                this.startLeastTime();
            }
        }
    };

    reset = () => {
        const user = {
            name: "Test User",
            email: "example@example.com",
            start_time: new Date().getTime(),
            end_time: undefined,
            tasks: []
        };
        this.setState({
            ...defaultState, user
        });
        this.props.save(user);
        window.location = "/";
    };

    save = async () => {
        let {user, currentTask, completedTask} = this.state;
        if (!completedTask) return;

        user.tasks[currentTask].end_time = new Date().getTime();
        if (currentTask < 7) {
            currentTask++;
            user.tasks[currentTask] = { start_time: new Date().getTime(), id: currentTask, result: {} }
        }
        if (currentTask === 7) {
            user.end_time = new Date().getTime()
        }
        const timeOut = [4, 5].find(i => i === currentTask) === undefined;
        completedTask = [2, 3].find(i => i === currentTask) === undefined; //TODO: uncomment this
        this.props.save(user);

        this.setState({user, currentTask, completedTask, timeOut});
        if (currentTask === 4 || currentTask === 5) {
            this.startLeastTime()
        }
    };

    startLeastTime = () => {
        this.leastInterval = setInterval(() => {
            let {leastTime, timeOut} = this.state;

            if (leastTime === 0) {
                clearInterval(this.leastInterval);
                leastTime = MAX_TIMEOUT;
                timeOut = true;
            } else {
                leastTime--;
                timeOut = false;
            }
            this.setState({leastTime, timeOut})
        }, 1000);
    };

    onChangeTask = async (task, data) => {
        let {user} = this.state;
        const {completed, result} = data;
        if (task === 0) {
            user.name = result.name;
            user.email = result.email;
        } else {
            user.tasks[task].result = result;
        }
        this.setState({completedTask: completed, user});

    };

    getTask = () => {
        const {user, currentTask, timeOut} = this.state;
        const id = currentTask;

        let task = user.tasks[id];
        if (!task) {
            task = { start_time: new Date().getTime(), id, result: {} };
            user.tasks[id] = task;
        }
        switch (id) {
            case 0: return <Task0 result={user} onChange={data => this.onChangeTask(id, data)} screen={id}/>;
            case 1: return <Task0 result={user} onChange={data => this.onChangeTask(id, data)} screen={id}/>;

            case 2: return <Task1_1 result={task.result} onChange={data => this.onChangeTask(id, data)}/>;
            case 3: return <Task1_2 result={task.result} onChange={data => this.onChangeTask(id, data)}/>;
            case 4: return <Task2 result={task.result} onChange={data => this.onChangeTask(id, data)} timeOut={timeOut}/>;

            case 5: return <TestTask result={task.result} onChange={data => this.onChangeTask(id, data)} timeOut={timeOut}/>;
            case 6: return <TestTask result={task.result} onChange={data => this.onChangeTask(id, data)}/>;

            case 7: return <FinishPage />;

            default: return <Loader fullScreen={false}/>
        }
    };

    render() {

        const {user, nextEnabled, currentTask, leastTime, timeOut} = this.state;

        let taskTime = user.tasks[currentTask] !== undefined ? user.tasks[currentTask].start_time : user.start_time;

        return (
            <div className={"test-task"}>
                <Header startTime={user.start_time} currentTask={currentTask} taskTime={taskTime} start_time={user.start_time} leastTime={leastTime} timeOut={timeOut}/>
                <div className="task-container">
                    <this.getTask/>
                </div>
                <div className="button-container">
                    <div className="button" onClick={this.reset}>RESET</div>
                    {   currentTask === 7 || !timeOut ? null :
                        <div className={`button${nextEnabled ? "" : " --disabled"}`} onClick={this.save}>
                            {t.btn_next}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

TTasks.propTypes = {
    user: PropTypes.object,
    save: PropTypes.func.isRequired
};

export default TTasks;