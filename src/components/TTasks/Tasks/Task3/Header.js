import React, { Component } from 'react';
import task3Content from './task3Content.json';
import { TASK_STATE } from './constants';

export default class Header extends Component {
    render() {
        const { title, description } = task3Content;
        const { taskState, fResults } = this.props;

        if (taskState === TASK_STATE.finalResult) {
            return (
                <>
                    <h2 className="remembrance__title">{title}</h2>
                    {fResults}
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
}
