import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from 'semantic-ui-react'
import { updateFormDetails } from './../../../actions/dashboard.actions';

const mapStateToProps = ({ dashboard }) => {
    const activeTab = dashboard.activeTab;
    const tab = dashboard.tabs[activeTab];
    const { activeMenu } = tab;
    return { 
        details: { ...tab.menu[activeMenu] },
        tabId: tab.id,
        menuId: activeMenu
    };
};

function mapDispatchToProps(dispatch) {
    return {
        setPublishDetails: (data, tabId, menuId) => dispatch(updateFormDetails(data, tabId, menuId))
    };
}

class PublishFormComponent extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = { ...props };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps })
    }

    /**
     * update store when user is leaving tab
     */
    componentWillUnmount() {
        const {details, tabId, menuId} = this.state;
        this.props.setPublishDetails(details, tabId, menuId);
    }

    handleChange(route, event) {
        this.setState(state => {
            state.details[event.id] = event.value;
            return state;
        });
    }

    render() {
        return (
            <>
            <Form size='mini'>
                <Form.Input fluid 
                    id="exchange"
                    value={this.state.details.exchange } 
                    onChange={ this.handleChange }
                    label='Exchange' 
                    placeholder='Exchange' />
                <Form.Input fluid 
                    id="routeKey"
                    value={this.state.details.routeKey } 
                    onChange={ this.handleChange }
                    label='Route Key' 
                    placeholder='Route Key' />
                <Form.TextArea 
                    id="body"
                    value={this.state.details.body } 
                    onChange={ this.handleChange }
                    label='Body' placeholder='Message' />
            </Form>
            </>
        )
    }
}

const publishFormComponent = connect(mapStateToProps, mapDispatchToProps)(PublishFormComponent);

export default publishFormComponent;
