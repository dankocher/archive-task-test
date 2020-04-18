import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import translations from "./constants/translations";
import WordTable from "./components/WordTable";
import {words} from './constants/words'


export default class Task2 extends Component{

    static propTypes = {
        result: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        finished: PropTypes.bool,
        fResults: PropTypes.object,
        timeOut: PropTypes.bool
    };

    onChange = async (v, i) => {
        const {onChange, result} = this.props;

        if (onChange) {
            let arr = result.words || [];
            arr[i] = v;
            let newResult = {
                ...result,
                words: arr,
                data: result.data ? result.data : words
            };

            let data = {
                completed: true,
                result: newResult
            };

            await onChange(data);
        }
    };

    // checkResult = result => {
    //     return  result.words.filter(w => w).length === 18
    // };

    render() {
        const {finished, fResults, timeOut, result} = this.props;

        return (
            <div className='task2'>
                <div className='name'>{translations.task2_name}</div>
                <div className='description'>
                    {
                        finished ? fResults : translations.task2_description
                    }
                </div>
                <div className={'word-task'}>
                    <WordTable
                        data={words}
                        result={result}
                        timeOut={timeOut}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}