import React from "react";
import './styles.scss';
import PropTypes from 'prop-types';

import t from "./language";
import {TextField} from "@material-ui/core";

const NAME = "name", EMAIL = "email";

class Task0 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: ""
        }
    }

    componentDidMount() {
        const {result} = this.props;
        if (result) {
            const {email, name} = result;
            this.setState({email, name})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const user = this.props.result;
        if (user.name !== this.state.name || user.email !== this.state.email) {
            const {email, name} = user;
            this.setState({email, name})
        }
    }

    // onChangeValue = (type, value) => {
    //     console.log(value);
    //     this.setState({
    //         [type]: value
    //     });
    //     this.props.onChange(this.state)
    // };


    handleChange = (event) => {
        const { target: { name, value } } = event;
        this.setState({[name]: value});
    }

    render() {
        const {email, name} = this.state;
        return (
            <div className={'task-0'}>
                <div className="t-section">{t.description}</div>
                <div className="t-section">
                    <TextField label={t.name} name={"name"} variant={"outlined"} className={"text-field"}
                               onChange={this.handleChange}
                                />
                </div>
                <div className="t-section">
                    <TextField label={t.email} name={"email"} variant={"outlined"} className={"text-field"}
                               onChange={this.handleChange}
                               />
                </div>
                <div className="t-section">{t.description_end}</div>
            </div>
        );
    }
}

Task0.propTypes = {
    result: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onFinish: PropTypes.func,
    timeOut: PropTypes.bool,
    finished: PropTypes.bool,
    fResults: PropTypes.object
};

export default Task0;