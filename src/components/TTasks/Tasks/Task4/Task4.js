import React, { Component } from 'react';
import task4Content from './task4Content.json';
import './style.scss';
import { TASK_STATE } from './constants';
import Header from './Header';
import Content from './Content';

export default class Task4 extends Component {

    getTaskState() {
        const { finished } = this.props;

        if (!finished) {
            return TASK_STATE.editing;
        }

        if (finished) {
            return TASK_STATE.finalResult;
        }

        throw new Error('Task4: invalid state');
    }

    handleChange = (event, propertyName, key) => {
        const target = event.target;

        const currentValues = this.getCurrentValues();

        currentValues[key][propertyName] = target.value;

        this.props.onChange({
            completed: true,
            result: currentValues,
        });
    }

    getCurrentValues() {
        const { initialValues } = task4Content;
        const { result } = this.props;

        if (this.getTaskState() === TASK_STATE.initial) {
            return { ...task4Content.initialValues };
        }

        return Object.keys(initialValues).reduce((currentValues, key) => {
            const resultCaptions = result && result[key] && result[key].captions;
            const resultWords = result && result[key] && result[key].words;
            const captions = resultCaptions || '';
            const words = resultWords || '';

            return {
                ...currentValues,
                [key]: { captions, words },
            };
        }, {});
    }

    render() {
        return (
            <div className="illustration" style={{marginBottom: this.props.marginBottom}}>
                <Header
                    taskState={this.getTaskState()}
                    fResults={this.props.fResults}
                />
                <div className="illustration__form">
                    <div className="illustration__form-container">
                        <Content
                            taskState={this.getTaskState()}
                            values={this.getCurrentValues()}
                            handleChange={this.handleChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
