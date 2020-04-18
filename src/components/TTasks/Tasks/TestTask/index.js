import React from "react";

class TestTask extends React.Component {

    onChange = e => {
        this.props.onChange({
            completed: true,
            result: {
                value: e.target.value
            }
        })
    }

    render() {
        const {result, timeOut} = this.props;
        return <div className="test-task">
            <h2>Задача</h2>
            {

                timeOut === false ? <h3>WAIT FOR TIMEOUT</h3> :
                <input value={result.value || ""} type="text" onChange={this.onChange}/>
            }
        </div>
    }
}

export default TestTask;