import React, { Component } from "react";
import { connect } from "react-redux";
import TapForm from "./tap.form";
import { startTap } from './../../../actions/dashboard.actions';

const mapStateToProps = ({ dashboard }) => {
    const { activeTab, rabbitmq} = dashboard;
    const tab = dashboard.tabs[activeTab];
    return { tab, rabbitmq  };
};
  
function mapDispatchToProps(dispatch) {
    return {
        startTap: tap => dispatch(startTap(tap))
    };
}
  

class TapComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { ...props };
        this.startTap = this.startTap.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps })
    }

    startTap({ exchange, bindingKey, tabId }) {
        this.props.startTap({ exchange, bindingKey, tabId });
    }

    render() {
        return <>
            <TapForm startTap={ this.startTap }></TapForm>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TapComponent);
