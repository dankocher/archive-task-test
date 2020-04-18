import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Header from "./Header";
import t from "./language";
import Task0 from "./Tasks/Task0";
import Loader from "../Loader";

import TestTask from "./Tasks/TestTask";
import FinishPage from "./Tasks/FinishPage";

const defaultState = {
    currentTask: 0,
    nextEnabled: true,
    completedTask: false
};

class TTasks extends React.Component {

    constructor(props) {
        super(props);

        const length = props.user.tasks.length;

        this.state = {
            ...defaultState,
            currentTask: length < 7 ? length : 7,
            user: props.user
        }
    }

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

    save = () => {
        let {user, currentTask, completedTask} = this.state;
        if (!completedTask) return;

        if (currentTask < 7) {
            currentTask++;
        }
        if (currentTask === 7) {
            user.end_time = new Date().getTime()
        }
        this.props.save(user);

        this.setState({user, currentTask});
    };

    onChangeTask = async (task, data) => {
        let {user} = this.state;
        const {completed, result} = data;
        if (task === 0) {
            user.name = result.name;
            user.email = result.email;
        } else {
            user.tasks[task] = {

                result,
            };
        }
        this.setState({completedTask: completed, user})

    };

    getTask = () => {
        const {user, currentTask} = this.state;
        const id = currentTask;

        let task = user.tasks[id];
        if (!task) {
            task = { start_time: new Date().getTime(), id, result: {} };
            user.tasks[id] = task;
            // this.setState({user})
        }
        switch (id) {
            case 0: return <Task0 result={user} onChange={data => this.onChangeTask(id, data)} screen={id}/>;
            case 1: return <Task0 result={user} onChange={data => this.onChangeTask(id, data)} screen={id}/>;

            case 2: return <TestTask result={task.result} onChange={data => this.onChangeTask(id, data)}/>;
            case 3: return <TestTask result={task.result} onChange={data => this.onChangeTask(id, data)}/>;
            case 4: return <TestTask result={task.result} onChange={data => this.onChangeTask(id, data)}/>;

            case 5: return <TestTask result={task.result} onChange={data => this.onChangeTask(id, data)}/>;
            case 6: return <TestTask result={task.result} onChange={data => this.onChangeTask(id, data)}/>;

            case 7: return <FinishPage />;

            default: return <Loader fullScreen={false}/>
        }
    };

    render() {

        const {user, nextEnabled, currentTask} = this.state;

        return (
            <div className={"test-task"}>
                <Header startTime={user.start_time} currentTask={currentTask} start_time={user.start_time}/>
                <div className="task-container">
                    <this.getTask/>
                </div>
                <div className="button-container">
                    <div className="button" onClick={this.reset}>RESET</div>
                    {   currentTask === 7 ? null :
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