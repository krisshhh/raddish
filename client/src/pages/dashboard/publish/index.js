import React, { Component } from "react";
import { connect } from "react-redux";
import PublishFormComponent from "./form";
import PublishProcessComponent from './process';

const mapStateToProps = ({ dashboard }) => {
    const activeTab = dashboard.activeTab;
    const tab = dashboard.tabs[activeTab];
    const { activeMenu } = tab;
    return { ...tab.menu[activeMenu] };
};

class PublishComponent extends Component {
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

const publishComponent = connect(mapStateToProps)(PublishComponent);

export default publishComponent;
