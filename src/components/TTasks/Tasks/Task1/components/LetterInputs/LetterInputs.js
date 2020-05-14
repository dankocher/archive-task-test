import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import './styles.scss'

export default class LetterInputs extends Component{
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        onChange: PropTypes.func,
        answers: PropTypes.array,
        enabled: PropTypes.func,
        disabled: PropTypes.bool,
        label: PropTypes.string
    };

    state = {
        arr: null
    };

    componentDidMount() {
        const {size} = this.props;
        let arr = [];
        for (let i = 0; i < size; i++) {
            arr.push('')
        }

        this.setState({arr})
    }

    onChange = (v, i) => {
        const {onChange} = this.props;

        if (onChange && v.length < 2) {
            onChange(v, i)
        }
    };

    onDelete = (key, i, v) => {
        const {onDelete} = this.props;

        if (key === 'Backspace' && onDelete && v.trim() === '') {
            onDelete(i);
        }
    };

    render() {
        const {answers, enabled, color, label, disabled, checking} = this.props;
        const {arr} = this.state;
        //console.log(color.toUpperCase(), checking, arr)
        return arr === null ? null :(
            <div className='letter-inputs'>
                <div className='label'
                     style={{backgroundColor: color === 'black' ? '#212121' : '#C63530'}}
                >{label}</div>
                {
                    arr.map((el, i) =>
                        <div className={
                            `letter-input
                            ${i === 0 ? ' first' : i===arr.length-1 ? ' last' : ''}`
                        } key={`input-${i}`}
                             id={`input-${color}-${i}`}
                             style={{
                                 borderColor: answers[i] || !enabled(i) ? color === 'black' ? '#212121' : '#C63530' : ''
                             }}
                        >
                            {
                                disabled &&
                                (answers[i] || '').trim().toLowerCase() !== (checking[i] || '').trim().toLowerCase() ?
                                <div className={`input-container`}>
                                </div> : null
                            }
                            <Input
                                className={`input ${color}`}
                                onChange={e => this.onChange(e.target.value, i)}
                                value={(answers[i] || '').trim()}
                                disabled={disabled || enabled(i)}
                                onKeyDown={e => this.onDelete(e.key, i, answers[i] || '')}
                            />
                        </div>
                        )
                }
            </div>
        )
    }
}