import React, { Component } from 'react';
import { TASK_STATE, IMAGE } from './constants';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import CrossSVG from './CrossSVG';
import throttle from './throttle';

export default class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpened: false,
            modalImgData: null,
            clientWidth: document.documentElement.clientWidth,
            clientHeight: document.documentElement.clientHeight,
        };

        this.throttledHandleResize = throttle(this.handleResive, 300);
    }

    componentDidMount() {
        window.addEventListener('resize', this.throttledHandleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.throttledHandleResize);
    }

    updateClientDimentions() {
        this.setState({
            clientWidth: document.documentElement.clientWidth,
            clientHeight: document.documentElement.clientHeight,
        });
    }

    handleResive = () => {
        this.updateClientDimentions();
    }

    openImageModal = (event) => {
        const target = event.target;
        const key = target.dataset.key;
        const imageData = IMAGE[key];

        this.setState({ isModalOpened: true, modalImgData: imageData });
    }

    closeImageModal = (event) => {
        this.setState({ isModalOpened: false });
    }

    getZoomCoef(imgWidth, imgHeight) {
        const { clientWidth, clientHeight } = this.state;

        const availableWidth = clientWidth - 64;
        const availableHeight = clientHeight - 64;

        return 1 / Math.max(imgWidth / availableWidth, imgHeight / availableHeight);
    }

    renderImageModal() {
        const modalImgData = this.state.modalImgData || {};
        const { src = '', width = 0, height = 0 } = modalImgData;
        const zoomKoef = this.getZoomCoef(width, height);

        return (
            <Dialog
                open={this.state.isModalOpened}
                onClose={this.closeImageModal}
                onBackdropClick={this.closeImageModal}
                aria-labelledby="simple-dialog-title"
                disableScrollLock={false}
                maxWidth={false}
            >
                <div className="illustration__modal-container">
                    <img 
                        src={src}
                        style={{
                            height: height * zoomKoef,
                            width: width * zoomKoef,
                        }}
                        className="illustration__modal-img"
                        alt="modal"
                    />
                    <div onClick={this.closeImageModal} className="illustration__modal-close-btn">
                        <CrossSVG />
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
                            data-key={key}
                            src={IMAGE[key].src} 
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
