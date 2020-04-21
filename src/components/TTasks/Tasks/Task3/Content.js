import React, { Component } from 'react';
import { TASK_STATE } from './constants';
import classnames from 'classnames';
import TextField from '@material-ui/core/TextField';

export default class Content extends Component {
    isInitialState() {
        return (this.props.taskState === TASK_STATE.initial);
    }

    isEditableState() {
        return (this.props.taskState === TASK_STATE.editing);
    }

    isFinalResultState() {
        return (this.props.taskState === TASK_STATE.finalResult);
    }

    renderNumbers(start, end) {
        const valuesEntries = Object.entries(this.props.values).slice(start, end);

        return valuesEntries.map(([key, item]) => {
            const { number, text } = item;

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
                    <input
                        type="text"
                        className={numberClasses} 
                        data-key={key} 
                        value={number} 
                        onChange={this.props.handleNumberChange}
                        readOnly={!this.isEditableState()}
                    />
                    <div className={textClasses}>
                        <TextField
                            data-key={key}
                            value={text}
                            onChange={(event) => this.props.handleTextChange(event, key)}
                            readOnly={!this.isEditableState()}
                            multiline
                            rows={1}
                            rowsMax={2}
                            variant="outlined"
                        />
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
