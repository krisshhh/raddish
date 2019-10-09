import React, { Component } from "react";
import { connect } from "react-redux";
import PublishFormComponent from "./form";
import PublishProcessComponent from './process';

const mapStateToProps = ({ dashboard }) => {
    return { ...dashboard };
};

class TapComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { ...props };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps })
    }

    render() {
        const { onProcess } = this.state;
        if (onProcess) {
            return <PublishProcessComponent></PublishProcessComponent>
        } else {
            return <PublishFormComponent></PublishFormComponent>
        }
    }
}

export default connect(mapStateToProps)(TapComponent);
