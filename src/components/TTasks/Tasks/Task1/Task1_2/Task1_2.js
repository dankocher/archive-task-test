import React, {Component} from 'react';
import translations from '../constants/transltions';
import PropTypes from 'prop-types';
import './styles.scss';
import LetterInputs from "../components/LetterInputs";
import table from './table2.jpg';

const red = 'к', black = 'ч';

export default class  Task1_2 extends Component{

    static propTypes = {
        result: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        timeOut: PropTypes.bool,
        finished: PropTypes.bool,
        fResults: PropTypes.object,
    };

    onDelete = async (i, param) => {
        const {onChange} = this.props;

        if (onChange) {
            let _param = param === 'black' ? 'red' : 'black';
            let _i = param === 'black' ? i : i-1;

            let input = document.getElementById(`input-${_param}-${_i > 0 ? _i : 0}`);

            if (input) {
                input.getElementsByTagName('input')[0].focus()
            }
        }
    };

    onChange = async (v, i, param) => {
        const {result, onChange} = this.props;
        //console.log('CHANGE')

        if (onChange) {
            let arr = result[param] || [];
            arr[i] = v;
            let newResult = {
                ...result,
                [param]: arr
            };

            let data = {
                completed: this.checkResult(newResult),
                result: newResult
            };

            await onChange(data);

            let _param = param === 'black' ? 'red' : 'black';
            let _i = param === 'black' ? i+1 : i;

            let input = document.getElementById(`input-${_param}-${_i}`);
            if (input) {
                input.getElementsByTagName('input')[0].focus()
            }
        }
    };

    checkResult = (result) => {
        return (result.red || []).filter(v => v).length === 25 && (result.black || []).filter(v => v).length === 24
    };

    makeEnabled = (i, res, param) => {
        let red = (res.red || []).filter((v, _i) => (param === 'black' || _i < i) && v).length;
        let black =  (res.black || []).filter((v, _i) => (param === 'red' || _i < i) && v).length;

        if (param === 'red') {
            return  i !== red || i > black
        } else {
            return i !== black || i >= red
        }
    };

    render() {
        const {finished, fResults, result} = this.props;

        return (
            <div className='task1_2'>
                <div className='name'>{translations.task1_2_name}</div>
                <div className='description'>
                    {
                        finished ? fResults : translations.task1_2_description
                    }
                </div>
                <div className='task_image'>
                    <img alt='' src={table}/>
                </div>
                <div className='answers_fields'>
                    <LetterInputs label={red} size={25} color={'red'} onChange={(v, i) => this.onChange(v, i, 'red')}
                                  onDelete={i => this.onDelete(i, 'red')}
                                  disabled={finished}
                                  answers={result.red || []} enabled={i => this.makeEnabled(i, result, 'red')}/>
                    <LetterInputs label={black} size={24} color={'black'} onChange={(v, i) => this.onChange(v, i, 'black')}
                                  onDelete={i => this.onDelete(i, 'black')}
                                  disabled={finished}
                                  answers={result.black || []} enabled={i => this.makeEnabled(i, result, 'black')}/>
                </div>
            </div>
        )
    }
}