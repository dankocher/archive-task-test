import React, { Component } from 'react';
import task3Content from './task3Content.json';
import Header from './Header';
import Content from './Content';
import { TASK_STATE } from './constants';
import './style.scss';

export default class Task3 extends Component {
    componentDidMount() {
        this.props.onChange({
            completed: true,
            result: this.props.result,
        });
    }

    handleNumberChange = (event) => {
        const target = event.target;

        const { key } = target.dataset;

        const currentValues = this.getCurrentValues();

        const myRe = /\d/;

        if (( myRe.exec(target.value) && target.value.length <= 1) || target.value === '') {
            currentValues[key].number = target.value;
            this.props.onChange({
                completed: true,
                result: currentValues,
            });
        }
    }

    handleTextChange = (event, key) => {
        const target = event.target;

        const currentValues = this.getCurrentValues();

        currentValues[key].text = target.value;

        this.props.onChange({
            completed: true,
            result: currentValues,
        });
    }

    getTaskState() {
        const { timeOut, finished, result } = this.props;
        const isResultsEmpty = !result || Object.keys(result).length === 0;

        if (isResultsEmpty && !timeOut && !finished) {
            return TASK_STATE.initial;
        }

        if (finished) {
            return TASK_STATE.finalResult;
        }

        if (timeOut) {
            return TASK_STATE.editing;
        }

        if (!isResultsEmpty && !timeOut && !finished) {
            return TASK_STATE.editingFinished;
        }

        throw new Error('Task3: invalid state');
    }

    getCurrentValues() {
        const { initialValues } = task3Content;
        const { result } = this.props;

        if (this.getTaskState() === TASK_STATE.initial) {
            return { ...task3Content.initialValues };
        }

        return Object.keys(initialValues).reduce((currentValues, key) => {
            const resultNumber = result && result[key] && result[key].number;
            const resultText = result && result[key] && result[key].text;
            const number = resultNumber || '';
            const text = resultText || '';

            return {
                ...currentValues,
                [key]: { number, text },
            };
        }, {});
    }

    
    render() {
        return (
            <div className={this.getTaskState() === TASK_STATE.finalResult ? "remembrance remembrance_final" : "remembrance remembrance_not-final"} style={{marginBottom: this.props.marginBottom}}>
                <div className="remembrance__container">
                    <Header
                        taskState={this.getTaskState()}
                        fResults={this.props.fResults}
                    />
                    <Content
                        taskState={this.getTaskState()}
                        values={this.getCurrentValues()}
                        handleNumberChange={this.handleNumberChange}
                        handleTextChange={this.handleTextChange}
                    />
                </div>
            </div>
        );
    }
}
