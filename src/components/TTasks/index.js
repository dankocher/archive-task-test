import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Header from "./Header";
import t from "./language";
import Task0 from "./Tasks/Task0";
import Loader from "../Loader";

import FinishPage from "./Tasks/FinishPage";
import Task1_1 from "./Tasks/Task1/Task1_1";
import Task1_2 from "./Tasks/Task1/Task1_2";
import Task2 from "./Tasks/Task2";
import AlertMessage from "../AlertMessage";
import Task3 from "./Tasks/Task3";
import Task4 from "./Tasks/Task4";

const MAX_TIMEOUT = 70;

const defaultState = {
    currentTask: 0,
    nextEnabled: true,
    timeOut: true,
    completedTask: false,
    recheck: false,
    showMessage: false,
    message: t.message,
    leastTime: MAX_TIMEOUT
};

class TTasks extends React.Component {

    constructor(props) {
        super(props);

        const length = props.user.tasks.length;

        this.state = {
            ...defaultState,
            // currentTask: length === 0 ? 0 : length < 8 ? length-1 : 7,
            currentTask: length === 0 ? 0 : length-1,
            user: props.user
        }
    }

    componentDidMount() {
        this.checkRestart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentTask !== this.state.currentTask) {
            document.getElementById('task-anchor').focus()
        }
    }

    checkRestart = async () => {
        const {user, currentTask} = this.state;
        if ((currentTask === 4 || currentTask === 5) && !user.tasks[currentTask].time_out) {
            if ((new Date().getTime() - user.tasks[currentTask].start_time) / 1000 < MAX_TIMEOUT) {
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
            start_time: undefined,
            end_time: undefined,
            date: new Date().getTime(),
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

        if (!completedTask) {
            if (currentTask > 0) {
                this.setState({
                    showMessage: true
                })
            }
            return this.setState({recheck: !this.state.recheck});
        }
        user.tasks[currentTask].end_time = new Date().getTime();
        if (currentTask < 7) {
            currentTask++;
            user.tasks[currentTask] = { start_time: new Date().getTime(), id: currentTask, result: {} }
        }
        if (currentTask === 1) {
            user.start_time = new Date().getTime();
        } else if (currentTask === 7) {
            user.end_time = new Date().getTime()
        }
        const timeOut = [4, 5].find(i => i === currentTask) === undefined;
        completedTask = [2, 3].find(i => i === currentTask) === undefined;
        this.props.save(user);

        this.setState({user, currentTask, completedTask, timeOut});
        window.scrollTo(0, 0);
        if ((currentTask === 4 || currentTask === 5) && !user.tasks[currentTask].time_out) {
            this.startLeastTime()
        }
    };

    startLeastTime = () => {
        this.leastInterval = setInterval(async () => {
            let {leastTime, timeOut, user, currentTask} = this.state;

            if (leastTime === 0) {
                clearInterval(this.leastInterval);
                leastTime = MAX_TIMEOUT;
                timeOut = true;
                user.tasks[currentTask].start_time = new Date().getTime();
                user.tasks[currentTask].time_out = true;
                user.start_time = user.start_time + MAX_TIMEOUT * 1000;
                await this.setState({user});
                this.props.save(user);
                this.setState({leastTime, timeOut})
            } else {
                leastTime--;
                timeOut = false;
                this.setState({leastTime, timeOut})
            }
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
        const {user, currentTask, timeOut, recheck} = this.state;
        const id = currentTask;
        //const id = 6;

        let task = user.tasks[id];
        if (!task) {
            task = { start_time: new Date().getTime(), id, result: {} };
            user.tasks[id] = task;
        }
        switch (id) {
            case 0: return <Task0 result={user} onChange={data => this.onChangeTask(id, data)} screen={id} recheck={recheck}/>;
            case 1: return <Task0 result={user} onChange={data => this.onChangeTask(id, data)} screen={id}/>;

            case 2: return <Task1_1 result={task.result} onChange={data => this.onChangeTask(id, data)}/>;
            case 3: return <Task1_2 result={task.result} onChange={data => this.onChangeTask(id, data)}/>;
            case 4: return <Task2 result={task.result} onChange={data => this.onChangeTask(id, data)} timeOut={task.time_out || timeOut}/>;

            case 5: return <Task3 result={task.result} onChange={data => this.onChangeTask(id, data)} timeOut={task.time_out || timeOut}/>;
            case 6: return <Task4 result={task.result} onChange={data => this.onChangeTask(id, data)}/>;

            case 7: return <FinishPage />;

            default: return <Loader fullScreen={false}/>
        }
    };

    render() {
        const {user, nextEnabled, currentTask, leastTime, timeOut, showMessage, message} = this.state;
        let taskTime = user.tasks[currentTask] !== undefined ? user.tasks[currentTask].start_time : user.start_time;

        return (
            <div className={"test-task"}>
                <div className="header-container">
                    <Header currentTask={currentTask} taskTime={taskTime} start_time={user.start_time} leastTime={leastTime} timeOut={timeOut}/>
                </div>
                <div className="task-container">
                    <div tabIndex='0' id={'task-anchor'}></div>
                    <this.getTask/>
                </div>
                <div className="button-container">
                    {/*<div className="button" onClick={() => this.setState({currentTask: currentTask-1})}>PREV</div>*/}
                    {/*<div className="button" onClick={this.reset}>RESET</div>*/}
                    {/*<div className="button" onClick={() => this.setState({showMessage: true})}>SHOW</div>*/}
                    {   currentTask === 7 || !timeOut ? null :
                        <div className={`button${nextEnabled ? "" : " --disabled"}`} onClick={this.save}>
                            {t.btn_next}
                        </div>
                    }
                </div>
                <AlertMessage open={showMessage}
                              onClose={() => this.setState({showMessage: false})}
                              message={message}
                />
            </div>
        );
    }
}

TTasks.propTypes = {
    user: PropTypes.object,
    save: PropTypes.func.isRequired
};

export default TTasks;