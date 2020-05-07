import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import './styles.scss';

export default class WordTable extends Component{

    state = {
        words: []
    };

    onChange = async (v, i) => {
        const {onChange} = this.props;
        const {words} = this.state;
        words[i] = v;
        await this.setState({words});


        if (onChange) {
            if (this[`word-${i}`].clientWidth < 193) {
                onChange(v, i)
            }
        }
    };

    render() {
        const {data, timeOut, result, finished, checking} = this.props;
        const {focused, words} = this.state;
        //console.log(checking)
        return (
            <div className='word-table'>
                {
                    data.map((w, i) => <div className='word-element' key={`word-${i}`}>
                        {
                            !timeOut ? w :
                                <>
                                    {
                                        finished &&
                                        ((result.words || [])[i] || '').trim() !== '' &&
                                        ((result.words || [])[i] || '').trim().toLowerCase() !== (checking[i] || '').trim().toLocaleLowerCase() ?
                                            <div className={`task2-error`}>{((result.words || [])[i] || '').trim()}</div>  :
                                            null
                                    }
                                    <>
                                        <div className='restriction-div'
                                             ref={word => this[`word-${i}`] = word}
                                        >{(words || [])[i]}</div>
                                        <Input
                                            className={
                                                `word-input${(result.words || [])[i] || 
                                                (focused === i && !finished) ? ' -filled' : ''}`
                                            }
                                            value={((result.words || [])[i] || '').trim()}
                                            readOnly={finished}
                                            onFocus={() => this.setState({focused: i})}
                                            onChange={e => this.onChange(e.target.value, i)}
                                            onBlur={() => this.setState({focused: undefined})}
                                        />
                                    </>
                                </>
                        }
                    </div>)
                }
            </div>
        )
    }
}