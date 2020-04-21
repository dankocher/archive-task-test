import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import './styles.scss';

export default class WordTable extends Component{

    state = {

    };

    onChange = (v, i) => {
        const {onChange} = this.props;

        if (onChange) {
            onChange(v, i)
        }
    };

    render() {
        const {data, timeOut, result, finished} = this.props;
        const {focused} = this.state;

        return (
            <div className='word-table'>
                {
                    data.map((w, i) => <div className='word-element' key={`word-${i}`}>
                        {
                            !timeOut ? w :
                                <Input
                                    className={`word-input${(result.words || [])[i] || (focused === i && !finished) ? ' -filled' : ''}`}
                                    value={(result.words || [])[i] || ''}
                                    readOnly={finished}
                                    onFocus={() => this.setState({focused: i})}
                                    onChange={e => this.onChange(e.target.value, i)}
                                    onBlur={() => this.setState({focused: undefined})}
                                />
                        }
                    </div>)
                }
            </div>
        )
    }
}