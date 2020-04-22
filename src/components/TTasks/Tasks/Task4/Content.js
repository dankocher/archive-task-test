import React, { Component } from 'react';
import { TASK_STATE, IMAGE, customStyles } from './constants';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';

export default class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpened: false,
            modalImgSrc: null,
        };
    }
    openImageModal = (event) => {
        const target = event.target;
        const src = target.src;
        this.setState({ isModalOpened: true, modalImgSrc: src });
    }

    closeImageModal = (event) => {
        this.setState({ isModalOpened: false, modalImgSrc: null });
    }

    renderImageModal() {
        return (
            // <Modal
            //     isOpen={this.state.isModalOpened}
            //     style={customStyles}
            //     contentLabel="onRequestClose Example"
            //     onRequestClose={this.closeImageModal}
            //     shouldCloseOnOverlayClick={true}
            // >
            //     <div className="illustration__modal-container">
            //         <div className="illustration__modal-img-container">
            //             <img 
            //                 src={this.state.modalImgSrc} 
            //                 className="illustration__modal-img" 
            //                 alt="modal"
            //             />
            //         </div>
            //         <div onClick={this.closeImageModal} className="illustration__modal-close-btn" />
            //     </div>
            // </Modal>

            // <button type="button" onClick={handleOpen}>
            //     Open Modal
            // </button>
            <Dialog
                open={this.state.isModalOpened}
                onClose={this.closeImageModal}
                onBackdropClick={this.closeImageModal}
                aria-labelledby="simple-dialog-title"
                disableScrollLock={false}
            >
                <div className="illustration__modal-container">
                     <div className="illustration__modal-img-container">
                         <img 
                             src={this.state.modalImgSrc} 
                             className="illustration__modal-img" 
                             alt="modal"
                         />
                         <div onClick={this.closeImageModal} className="illustration__modal-close-btn" />
                    </div>
                </div>
          </Dialog>
        );
    }

    renderContent() {
        const currentValues = this.props.values;
        const valuesEntries = Object.entries(currentValues)

        return valuesEntries.map(([key, item]) => {
            const { captions, words } = item;
            const isEditable = this.props.taskState === TASK_STATE.editing;

            return (
                <div key={key} className="illustration__item">
                    <h3 className="illustration__img-title">{`Картинка ${Number(key) + 1}`}</h3>
                    <div className={`illustration__img-container illustration__img-container_${key}`}>
                        <img 
                            src={IMAGE[key]} 
                            className="illustration__img" 
                            alt="illustration"
                            onClick={this.openImageModal}
                        />
                    </div>
                    <div className="illustration__field-container">
                        <TextField
                            value={isEditable ? captions : captions || ' '}
                            onChange={(event) => this.props.handleChange(event, "captions", key)}
                            InputProps={{
                                readOnly: !isEditable
                            }}
                            label="Введите заголовки"
                            multiline
                            rows={4}
                            rowsMax={30}
                            variant="outlined"
                        />
                        <TextField
                            data-key={key} 
                            data-property-name="words"
                            value={isEditable ? words : words || ' '}
                            onChange={(event) => this.props.handleChange(event, "words", key)}
                            InputProps={{
                                readOnly: !isEditable
                            }}
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

    render() {
        return (
            <>
                {this.renderContent()}
                {this.renderImageModal()}
            </>
        );
    }
}