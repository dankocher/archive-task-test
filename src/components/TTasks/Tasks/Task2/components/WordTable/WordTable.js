import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import './styles.scss';

export default class WordTable extends Component{

    onChange = (v, i) => {
        const {onChange} = this.props;

        if (onChange) {
            onChange(v, i)
        }
    };

    render() {
        const {data, timeOut, result} = this.props;

        return (
            <div className='word-table'>
                {
                    data.map((w, i) => <div className='word-element' key={`word-${i}`}>
                        {
                            !timeOut ? w :
                                <Input
                                    className={`word-input${(result.words || [])[i] ? ' -filled' : ''}`}
                                    value={(result.words || [])[i] || ''}
                                    onChange={e => this.onChange(e.target.value, i)}
                                />
                        }
                    </div>)
                }
            </div>
        )
    }
}