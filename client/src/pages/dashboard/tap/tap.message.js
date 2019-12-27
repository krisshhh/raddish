import React from 'react';
import ReactJson from 'react-json-view'

class TapMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { ...props };
    }

    render() {
        const my_json_object = {
            hello: "world"
        }
        return (
            <div className="app-tap-message">
                <ReactJson src={my_json_object} />
            </div> 
        )
    }

}

export default TapMessage;