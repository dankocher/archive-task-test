import React from "react";
import './styles.scss';
import PropTypes from 'prop-types';

import t from "./language";
import {TextField} from "@material-ui/core";

class Task0 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            nameBlurred: false,
            emailBlurred: false
        }
    }

    componentDidMount() {
        this.start();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.recheck !== nextProps.recheck) {
            this.setState({
                nameBlurred: true,
                emailBlurred: true,
            })
        }
    }

    start = async() => {
        const {result} = this.props;
        if (result) {
            const {email, name} = result;
            await this.setState({email, name})
        }

        this.saveChanges();
    };

    validateName = () => {
        return (this.state.name.length > 0)
    };

    validateEmail = () => {
        // eslint-disable-next-line no-useless-escape
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.state.email).toLowerCase());
    };

    saveChanges = () => {
        const completed = this.validateName && this.validateEmail();
        this.props.onChange({completed, result:{name: this.state.name, email: this.state.email}});
    };

    handleChange = async (event) => {
        const { target: { name, value } } = event;
        // console.log(name, value)

        if (value.length <= 30) {
            await this.setState({[name]: value});
            this.saveChanges();
        }
    };

    render() {
        const {email, name, nameBlurred, emailBlurred} = this.state;
        const {screen} = this.props;

        const nameError = nameBlurred && !this.validateName();
        const emailError = emailBlurred && !this.validateEmail();
        return (
            <div className={'task-0'}>
                {
                    screen === 0 ?
                        <form className={"form"} autoComplete="off">
                            <div className="t-section">{t.description}</div>
                            <div className="t-section">
                                <TextField value={name} label={t.name} name={"name"} variant={"outlined"} className={"text-field"}
                                           error={nameError}
                                           onChange={this.handleChange}
                                           onBlur={() => this.setState({nameBlurred: true})}
                                />
                            </div>
                            <div className="t-section">
                                <TextField value={email} label={t.email} name={"email"} variant={"outlined"} className={"text-field"}
                                           error={emailError}
                                           onChange={this.handleChange}
                                           onBlur={() => this.setState({emailBlurred: true})}
                                />
                            </div>
                            <div className="t-section">{t.description_end}</div>
                        </form>
                        :
                        <div className="t-section">{t.tasks_description}</div>
                }
            </div>
        );
    }
}

Task0.propTypes = {
    result: PropTypes.object,
    screen: PropTypes.oneOf([0, 1]).isRequired,
    recheck: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    timeOut: PropTypes.bool,
    finished: PropTypes.bool,
    fResults: PropTypes.object
};

export default Task0;
