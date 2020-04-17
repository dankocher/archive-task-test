import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Header from "./Header";
import t from "./language";
import Task0 from "./Tasks/Task0";
import Loader from "../Loader";

class TTasks extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTask: 0,
            user: {
                name: "",
                email: "",
                start_time: new Date().getTime(),
            }
        }
    }

    componentDidMount() {
        const {user} = this.props;
        if (user) {
            this.setState({user})
        }
    }

    save = () => {
        this.props.save(this.state.user);
    };

    onChangeTask = async (task, result) => {
        console.log(task, result)
        const user = this.state.user;
        if (task === 0) {
            user.name = result.name;
            user.email = result.email;
        } else {

        }
        this.setState({user});
    };

    getTask = task => {
        const user = this.state.user;
        switch (task) {
            case 0: return <Task0 result={user}
                                  onChange={result => this.onChangeTask(task, result)}
            />;

            default: return <Loader/>
        }
    };
    handleChange = (event) => {
        const { target: { name, value } } = event;
        console.log(name, value);
    }
    render() {

        const {user, currentTask} = this.state;

        return (
            <div className={"test-task"}>
                <Header startTime={user.start_time}/>
                <div className="task-container">
                    {this.getTask(currentTask)}
                </div>
                <div className="button-container">
                    <div className="button-finish" onClick={this.save}>
                        {t.btn_next}
                    </div>
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