import React, { Component } from 'react';
import { TASK_STATE } from './constants';
import classnames from 'classnames';
import TextField from '@material-ui/core/TextField';

export default class Content extends Component {

    state = {
      text: {}
    };

    isInitialState() {
        return (this.props.taskState === TASK_STATE.initial);
    }

    isEditableState() {
        return (this.props.taskState === TASK_STATE.editing);
    }

    isFinalResultState() {
        return (this.props.taskState === TASK_STATE.finalResult);
    }

    changeText = async (event, key) => {
        const value = event.target.value;
        if (value.match(/\n/) || value.match("  ") || value.match(/^\s/) || value.length > 30) {
            return;
        }
        // const oldValue = this.state.text[key];
        // await this.setState({text: {...this.state.text, [key]: value}});
        this.setState({text: {...this.state.text, [key]: value}});
        // console.log(event.target.value)
        // console.log(this.state)
        // console.log(this[`Text_${key}`])

        this.props.handleTextChange({target: {value}}, key)
        // if (this[`Text_${key}`].clientHeight <= 34) {
        //     this.props.handleTextChange({target: {value}}, key)
        // } else {
        //     this.setState({text: {...this.state.text, [key]: oldValue}});
        // }
    };

    renderNumbers(start, end) {
        const valuesEntries = Object.entries(this.props.values).slice(start, end);
        const {checking, finished} = this.props;

        return valuesEntries.map(([key, item]) => {
            let { number, text } = item;

            text = text || "";

            const notEmptyClassnameEditNumber = Boolean(number) && this.isEditableState();
            const notEmptyClassnameFinalNumber = Boolean(number) && this.isFinalResultState();
            const notEmptyClassnameEditText = Boolean(text) && this.isEditableState();
            const notEmptyClassnameFinalText = Boolean(text) && this.isFinalResultState();

            const numberClasses = classnames('remembrance__input-number', {
                'remembrance__input-number_initial': !this.isInitialState() && !this.isEditableState() && !this.isFinalResultState(),
                'remembrance__input-number_not-empty': notEmptyClassnameEditNumber || notEmptyClassnameFinalNumber,
                'remembrance__input-number_editable': this.isEditableState(),
                'remembrance__input-number_final': this.isFinalResultState(),
            });

            const textClasses = classnames('remembrance__input-text', {
                'remembrance__input-text_initial': !this.isInitialState() && !this.isEditableState() && !this.isFinalResultState(),
                'remembrance__input-text_not-empty': notEmptyClassnameEditText || notEmptyClassnameFinalText,
                'remembrance__input-text_editable': this.isEditableState(),
                'remembrance__input-text_final': this.isFinalResultState(),
            });

            return (
                <div key={key} className="remembrance__item">
                        {
                            finished &&
                            ((checking || {}).model || [])[+key] !== (number || '').trim() &&
                            (number || '').trim() !== '' ?
                                <div className={`input-container`}>
                                <div className={`-error`}>
                                    {number}
                                </div>
                                </div>:
                                <input
                                    type="text"
                                    className={`${numberClasses}`}
                                    data-key={key}
                                    value={finished ? (number || '').trim() : number}
                                    onChange={this.props.handleNumberChange}
                                    readOnly={!this.isEditableState()}
                                />
                        }
                    <div className={`${textClasses}`}>
                        {
                            finished &&
                            ((checking || {}).model || [])[+key+10].toLowerCase() !== text.toLowerCase() &&
                            text !== '' ?
                                <div className={'text-area-container'}>
                                <div className={`-error`}>
                                    {text}
                                </div>
                                </div>:
                                <>
                                    <div className={'restriction-div'} ref={inp => this[`Text_${key}`] = inp}>{this.state.text[key]}</div>
                                <TextField
                                    data-key={key}
                                    value={text}
                                    onChange={(event) => this.changeText(event, key)}
                                    InputProps={{
                                        readOnly: !this.isEditableState()
                                    }}
                                    multiline
                                    rowsMax={2}
                                    variant="outlined"
                                />
                                </>
                        }
                    </div>
                </div>
            );
        });
    }

    render() {
        const numberClasses = classnames('remembrance__numbers', {
            'remembrance__numbers_initial': this.isInitialState() && !this.isEditableState(),
            'remembrance__numbers_editable': this.isEditableState(),
            'remembrance__numbers_finished': this.isFinalResultState(),
        });

        return (
            <div className="remembrance__numbers-container">
                <div className={numberClasses}>
                    {this.renderNumbers(0, 5)}
                </div>
                <div className={numberClasses}>
                    {this.renderNumbers(5, 10)}
                </div>
            </div>
        );
    }
}
