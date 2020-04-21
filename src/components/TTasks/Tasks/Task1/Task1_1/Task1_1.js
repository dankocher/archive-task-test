import React, {Component} from 'react';
import translations from '../constants/transltions';
import PropTypes from 'prop-types';
import './styles.scss';
import LetterInputs from "../components/LetterInputs";
import table from './table1.jpg';

const red = 'к', black = 'ч';

export default class  Task1_1 extends Component{

    static propTypes = {
        result: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        finished: PropTypes.bool,
        fResults: PropTypes.object,
        marginBottom: PropTypes.number
    };

    componentDidMount() {
        const {result, onChange} = this.props;

        onChange({
            result,
            completed: this.checkResult(result),
        })
    }

    onDelete = async (i, param) => {
        const {onChange} = this.props;

        if (onChange) {

            let input = document.getElementById(`input-${param}-${i-1 > 0 ? i-1 : 0}`);

            if (input) {
                input.getElementsByTagName('input')[0].focus()
            }

        }
    };

    onChange = async (v, i, param) => {
        const {result, onChange} = this.props;

        if (onChange) {
            //console.log('CHANGE', v);
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

            let input = document.getElementById(`input-${param}-${i+1}`);
                if (input) {
                    input.getElementsByTagName('input')[0].focus()
                }
        }
    };

    checkResult = (result) => {
        return (result.red || []).filter(v => v).length === 25 && (result.black || []).filter(v => v).length === 24
    };

    makeEnabled = (i, res, size) => {
        let red = (res.red || []).filter((v, _i) => (size===24 || _i < i) && v).length;
        let black =  (res.black || []).filter((v, _i) =>  (size===25 || _i < i) && v).length;

        if (size === 24) {
            return i !== black
        } else {
            return i !== red || black !== 24
        }
    };

    render() {
        const {finished, fResults, result, marginBottom} = this.props;

        return (
            <div className='task1_1' style={{marginBottom}}>
                <div className='name'>{translations.task1_1_name}</div>
                <div className={`description${finished ? ' -finished' : ''}`}>
                    {
                        finished ? fResults : translations.task1_1_description
                    }
                </div>
                {
                    finished ? null :
                        <div className='task_image'>
                            <img alt='' src={table}/>
                        </div>
                }
                <div className='answers_fields'>
                    <LetterInputs label={black} size={24} color={'black'} onChange={(v, i) => this.onChange(v, i, 'black')}
                                  onDelete={i => this.onDelete(i, 'black')}
                                  disabled={finished}
                                  answers={result.black || []} enabled={i => this.makeEnabled(i, result, 24)}/>
                    <LetterInputs label={red} size={25} color={'red'} onChange={(v, i) => this.onChange(v, i, 'red')}
                                  onDelete={i => this.onDelete(i, 'red')}
                                  disabled={finished}
                                  answers={result.red || []} enabled={i => this.makeEnabled(i, result, 25)}/>
                </div>
            </div>
        )
    }
}