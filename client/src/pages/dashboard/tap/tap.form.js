import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Card } from 'semantic-ui-react'
import { updateFormDetails } from './../../../actions/dashboard.actions';

const mapStateToProps = ({ dashboard }) => {
    const activeTab = dashboard.activeTab;
    const tab = dashboard.tabs[activeTab];
    return { 
        ...tab
    };
};

function mapDispatchToProps(dispatch) {
    return {
        setPublishDetails: (tabId, exchange, bindingKey) => dispatch(updateFormDetails({ exchange, tabId, bindingKey }))
    };
}

class TapForm extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = { ...props };
        this.handleChange = this.handleChange.bind(this);
        this.onTapClick = this.onTapClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps })
    }

    /**
     * update store when user is leaving tab
     */
    componentWillUnmount() {
        const { exchange, id, bindingKey } = this.state;
        this.props.setPublishDetails(id, exchange, bindingKey);
    }

    handleChange(route, event) {
        this.setState(state => {
            state[event.id] = event.value;
            return state;
        });
    }

    onTapClick() {
        const { exchange, id: tabId, bindingKey } = this.state;
        this.props.startTap({ exchange, tabId, bindingKey });
    }

    render() {
        return (
            <Card fluid>
                <div className="app-tap-form">
                    <div className="controls">
                        <Form size={ 'tiny' }>
                            <Form.Group widths='equal' >
                                <Form.Input
                                    fluid
                                    id='exchange'
                                    label='Exchange'
                                    value={ this.state.exchange } 
                                    onChange={ this.handleChange }
                                    />
                                <Form.Input
                                    fluid
                                    id='bindingKey'
                                    label='Binding Key'
                                    value={ this.state.bindingKey } 
                                    onChange={ this.handleChange }
                                    />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="action">
                        <Button primary onClick={ this.onTapClick }>Tap</Button>
                    </div>
                </div>
            </Card>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TapForm);;
