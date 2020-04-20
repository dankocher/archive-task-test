import React, { Component } from 'react';
import task3Content from '../../api/task3Content.json';
import classnames from 'classnames';
import TextField from '@material-ui/core/TextField';
import './style.scss';

const TASK_STATE = {
    initial: 'initial',
    editing: 'editing',
    editingFinished: 'editingFinished',
    finalResult: 'finalResult',
};

export default class Task3 extends Component {
    getTaskState() {
        const { timeOut, finished, results } = this.props;
        const isResultsEmpty = !results || Object.keys(results).length === 0;

        if (isResultsEmpty && !timeOut && !finished) {
            return TASK_STATE.initial;
        }

        if (timeOut) {
            return TASK_STATE.editing;
        }

        if (!isResultsEmpty && !timeOut && !finished) {
            return TASK_STATE.editingFinished;
        }

        if (finished) {
            return TASK_STATE.finalResult;
        }

        throw new Error('Task3: invalid state');
    }

    handleChange = (event) => {
        const target = event.target;

        const { key, propertyName } = target.dataset;

        const currentValues = this.getCurrentValues();

        currentValues[key][propertyName] = target.value;



        this.props.onChange({
            complited: false, 
            results: currentValues,
        });

        if (this.areAllValuesSet(currentValues)) {
            this.props.onChange({
                complited: true, 
                results: currentValues,
            });
        }
    }

    componentDidMount() {
        const currentValues = this.getCurrentValues();

        this.props.onChange({
            complited: false,
            results: currentValues,
        });

        if (this.areAllValuesSet(currentValues)) {
            this.props.onChange({
                complited: true,
                results: currentValues,
            });
        }
    }

    handleChangeField = (event, propertyName, key) => {
        const target = event.target;

        const currentValues = this.getCurrentValues();

        currentValues[key][propertyName] = target.value;

        this.props.onChange({
            complited: false,
            results: currentValues,
        });
        if (this.areAllValuesSet(currentValues)) {
            this.props.onChange({
                complited: true,
                results: currentValues,
            });
        }
    }

    areAllValuesSet(values) {
        return Object.values(values).every((item) => {
            return Boolean(item.number) && Boolean(item.text);
        });
    }

    getCurrentValues() {
        const { initialValues } = task3Content;
        const { results } = this.props;

        if (this.getTaskState() === TASK_STATE.initial) {
            return { ...task3Content.initialValues };
        }

        return Object.keys(initialValues).reduce((currentValues, key) => {
            const number = results && results[key] && results[key].number || '';
            const text = results && results[key] && results[key].text || '';

            return {
                ...currentValues,
                [key]: { number, text },
            };
        }, {});
    }

    renderNumbers(start, end) {
        const currentValues = this.getCurrentValues();
        const valuesEntries = Object.entries(currentValues).slice(start, end);

        return valuesEntries.map(([key, item]) => {
            const { number, text } = item;
            const isInitial = this.getTaskState() === TASK_STATE.initial;
            const isEditable = this.getTaskState() === TASK_STATE.editing;

            const numberClasses = classnames('remembrance__input-number', {
                'remembrance__input-number_initial': !isInitial && !isEditable,
                'remembrance__input-number_not-empty': Boolean(number),
                'remembrance__input-number_editable': isEditable,
            });

            const textClasses = classnames('remembrance__input-text', {
                'remembrance__input-text_initial': !isInitial && !isEditable,
                'remembrance__input-text_not-empty': Boolean(text),
                'remembrance__input-text_editable': isEditable,
            });

            return (
                <div key={key} className="remembrance__item">
                    <input 
                        className={numberClasses} 
                        data-key={key} 
                        data-property-name="number" 
                        value={number} 
                        onChange={this.handleChange}
                        disabled={!isEditable}
                    />
                    <div className={textClasses}>
                        <TextField
                            data-key={key}
                            value={text}
                            onChange={(event) => this.handleChangeField(event, "text", key)}
                            disabled={!isEditable}
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

    renderTask() {
        const isInitial = this.getTaskState() === TASK_STATE.initial;
        const isEditable = this.getTaskState() === TASK_STATE.editing;

        const numberClasses = classnames('remembrance__numbers', {
            'remembrance__numbers_initial': !isInitial && !isEditable,
            'remembrance__numbers_editable': isEditable,
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

    renderTitleAndDescription() {
        const { title, description } = task3Content;

        if (this.getTaskState() === TASK_STATE.finalResult) {
            return (
                <>
                    <div className="remembrance__description">
                        <h2 className="remembrance__title">{title}</h2>
                    </div>
                    {this.props.fResults}
                </>
            );
        }

        return (
            <>
                <div className="remembrance__description">
                    <h2 className="remembrance__title">{title}</h2>
                </div>

                <div className="remembrance__task-description">
                    <p className="remembrance__text">{description}</p>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="remembrance">
                <div className="remembrance__container">
                    {this.renderTitleAndDescription()}
                    {this.renderTask()}
                </div>
            </div>
        );
    }
}
