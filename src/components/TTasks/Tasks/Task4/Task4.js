import React, { Component } from 'react';
import task4Content from '../../api/task4Content.json';
import Captions from '../../assets/img/screen2.jpg';
import Keywords from '../../assets/img/screen1.jpg';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './style.scss';
import avatarsImg from '../../assets/img/avatars.jpg';
import sleepImg from '../../assets/img/sleep.jpg';
import shoppingImg from '../../assets/img/shopping.jpg';
import businessImg from '../../assets/img/business.jpg';
import moneyImg from '../../assets/img/money.jpg';
import Modal from 'react-modal';

const customStyles = {
        content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

const TASK_STATE = {
    initial: 'initial',
    editing: 'editing',
    editingFinished: 'editingFinished',
    finalResult: 'finalResult',
};

const IMAGE = {
    0: avatarsImg,
    1: shoppingImg,
    2: sleepImg,
    3: businessImg,
    4: moneyImg,
}

export default class Task4 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpened: false,
            modalImgSrc: null,
        };
    }

    getTaskState() {
        const { timeOut, finished, results } = this.props;
        const isResultsEmpty = !results || Object.keys(results).length === 0;

        // if (isResultsEmpty && !timeOut && !finished) {
        //     return TASK_STATE.initial;
        // }

        // if (timeOut) {
        //     return TASK_STATE.editing;
        // }

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
            complited: true, 
            results: currentValues,
        });
    }

    getCurrentValues() {
        const { initialValues } = task4Content;
        const { results } = this.props;

        if (this.getTaskState() === TASK_STATE.initial) {
            return { ...task4Content.initialValues };
        }

        return Object.keys(initialValues).reduce((currentValues, key) => {
            const captions = results && results[key] && results[key].captions || '';
            const words = results && results[key] && results[key].words || '';

            return {
                ...currentValues,
                [key]: { captions, words },
            };
        }, {});
    }

    openImageModal = (event) => {
        const target = event.target;
        const src = target.src;

        this.setState({ isModalOpened: true, modalImgSrc: src });
    }

    closeImageModel = (event) => {
        this.setState({ isModalOpened: false, modalImgSrc: null });
    }

    renderImageModal() {
        return (
            <Modal
                isOpen={this.state.isModalOpened}
                style={customStyles}
                shouldCloseOnOverlayClick={true}
            >
                <div className="illustration__modal-container">
                    <img 
                    src={this.state.modalImgSrc} 
                    className="illustration__modal-img" 
                    alt="modal"
                    onClick={this.closeImageModel}
                    />
                    <div onClick={this.closeImageModel} className="illustration__modal-close-btn"></div>
                </div>
            </Modal>
        );
    }

    renderTasks() {
        const currentValues = this.getCurrentValues();
        const valuesEntries = Object.entries(currentValues)

        return valuesEntries.map(([key, item]) => {
            const { captions, words } = item;
            const isInitial = this.getTaskState() === TASK_STATE.initial;
            const isEditable = this.getTaskState() === TASK_STATE.editing;

            return (
                <div key={key} className="illustration__item">
                    <h3 className="illustration__img-title">{`Картинка ${Number(key) + 1}`}</h3>
                    <img 
                        src={IMAGE[key]} 
                        className="illustration__img" 
                        alt="screen2"
                        onClick={this.openImageModal}
                    />
                    <div className="illustration__field-container">
                        <TextField
                            value={captions}
                            onChange={(event) => this.handleChange(event, "captions", key)}
                            disabled={!isEditable}
                            label="Введите заголовки"
                            multiline
                            rows={4}
                            rowsMax={30}
                            variant="outlined"
                        />
                        <TextField
                            data-key={key} 
                            data-property-name="words"
                            value={words}
                            onChange={(event) => this.handleChange(event, "words", key)}
                            disabled={!isEditable}
                            label="Введите ключевые слова"
                            multiline
                            rows={4}
                            rowsMax={30}
                            variant="outlined"
                        />
                    </div>
                </div>
            );
        });
    }

    renderTitleAndDescription() {
        if (this.getTaskState() === TASK_STATE.finalResult) {
            return (
                <>
                    <div className="illustration__description">
                        <h2 className="illustration__title">{task4Content.title}</h2>
                    </div>
                    {this.props.fResults}
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
                        <p className="illustration__text-list illustration__text-list_indent">{task4Content.text5}<a href={task4Content.href}>ссылке</a>{task4Content.text6}</p>
                        <p className="illustration__text-list illustration__text-list_indent">{task4Content.text7}</p>
                        <p className="illustration__text-list illustration__text-list_indent">{task4Content.text8}</p>
                    </div>
                    <img src={Captions} alt="screen1" className="illustration__img-screen"/>
                    <div className="illustration__text-container">
                        <p className="illustration__text-list illustration__text-list_indent">{task4Content.text9}</p>
                    </div>
                    <img src={Keywords} alt="screen2" className="illustration__img-screen"/>
                </div>
                <div className="illustration__task-description">
                    <h2 className="illustration__title-task">Задание</h2>
                    <p className="illustration__text-task">{task4Content.task}</p>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="illustration">
                {this.renderTitleAndDescription()}
                <div className="illustration__form">
                    <div className="illustration__form-container">
                        {this.renderTasks()}
                        {this.renderImageModal()}
                    </div>
                </div>
            </div>
        );
    }
}
