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
        const {result} = this.props;
        return <div className="test-task">
            <input value={result.value || ""} type="text" onChange={this.onChange}/>
        </div>
    }
}

export default TestTask;