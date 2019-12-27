import React, { Component } from "react";
import { connect } from "react-redux";
import TapForm from "./tap.form";
import Timeline from '../../../components/Timeline/timeline'
import { startTap } from './../../../actions/tap.actions';
import TapMessage from './tap.message';
import './tap.styles.scss';

const mapStateToProps = ({ dashboard }) => {
    const { activeTab, rabbitmq } = dashboard;
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
        this.state = { 
            events: [],
            selectedEvent: {},
            ...props 
        };
        this.startTap = this.startTap.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps })
    }

    startTap({ exchange, bindingKey, tabId }) {
        this.props.startTap({ exchange, bindingKey, tabId });
        // this.setState({
        //     events: [ ...this.state.events, {
        //         time: new Date(),
        //         name: `Event`,
        //         data: {},
        //     }]
        // });
        // console.log(this.state);
    }

    render() {
        const { events, selectedEvent } = this.state;
        return <div className="app-tap">
            <TapForm startTap={ this.startTap }></TapForm>
            <Timeline events={ events } ></Timeline>
            <TapMessage event={ selectedEvent }></TapMessage>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TapComponent);
