import React, { Component } from 'react';
import task4Content from './task4Content.json';
import { TASK_STATE } from './constants';
import Captions from './assets/img/screen2.jpg';
import Keywords from './assets/img/screen1.jpg';

export default class Header extends Component {
    render() {
        const { taskState, fResults } = this.props;

        if (taskState === TASK_STATE.finalResult) {
            return (
                <>
                    <div className="illustration__description">
                        <h2 className="illustration__title">{task4Content.title}</h2>
                    </div>
                    {fResults}
                </>
            );
        }

        return (
            <div className="illustration__container">
                <div className="illustration__description">
                    <h2 className="illustration__title">{task4Content.title}</h2>
                    <p className="illustration__text">{task4Content.description}</p>
                    <p className="illustration__text"><span className="illustration__bold">{task4Content.bold1}</span>{task4Content.text2}</p>
                    <p className="illustration__text"><span className="illustration__bold">{task4Content.bold2}</span>{task4Content.text3}</p>
                    <div className="illustration__text-container">
                        <p className="illustration__text-list">{task4Content.text4}</p>
                        <p className="illustration__text-list illustration__text-list_indent">{task4Content.text5}<a href={task4Content.href} target="_blank" rel="noopener noreferrer">ссылке</a>{task4Content.text6}</p>
                        <p className="illustration__text-list illustration__text-list_indent">{task4Content.text7}</p>
                        <p className="illustration__text-list illustration__text-list_indent">{task4Content.text8}</p>
                    </div>
                    <div className="illustration__screen-container illustration__screen-container_1">
                        <img src={Captions} alt="screen1" className="illustration__img-screen"/>
                    </div>
                    <div className="illustration__text-container">
                        <p className="illustration__text-list illustration__text-list_indent">{task4Content.text9}</p>
                    </div>
                    <div className="illustration__screen-container illustration__screen-container_2">
                        <img src={Keywords} alt="screen2" className="illustration__img-screen"/>
                    </div>
                </div>
                <div className="illustration__task-description">
                    <h2 className="illustration__title-task">Задание</h2>
                    <div className="illustration__text-task">
                        <p className="illustration__text-task-paragraph">{task4Content.task1}</p>
                        <p className="illustration__text-task-paragraph">{task4Content.task2}</p>
                        <p className="illustration__text-task-paragraph">{task4Content.task3}</p>
                    </div>
                </div>
            </div>
        );
    }
}