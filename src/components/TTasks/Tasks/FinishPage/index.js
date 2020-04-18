import React from "react";

class FinishPage extends React.Component {

    onChange = e => {
        this.props.onChange({
            completed: true,
            result: {
                value: e.target.value
            }
        })
    };

    render() {
        const {result} = this.props;
        return <div className="finish-page">
            <input value={result.value || ""} type="text" onChange={this.onChange}/>
        </div>
    }
}

export default FinishPage;