import React, { Component } from "react";
import { Tab, Icon, Menu } from 'semantic-ui-react';
import { remove, findIndex } from 'lodash';
import TabPaneComponent from './tab-pane';
import { connect } from "react-redux";
import { newTab, setActiveTab, closeTab} from './../../actions/dashboard.actions'
import uuid from 'uuid';

const mapStateToProps = ({ dashboard }) => {
    return dashboard;
};

function mapDispatchToProps(dispatch) {
    return {
        newTab: () => dispatch(newTab()),
        setActiveTab: index => dispatch(setActiveTab(index)),
        closeTab: id => dispatch(closeTab(id))
    };
}

class TabComponent extends Component {
    constructor(props, context) {
        super(props, context)
        this.addTab = this.addTab.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.state = {
            ...props,
            ...this.getPanes(props)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ... this.getPanes(nextProps) })
    }

    getPanes(props) {
        return {
            panes: [
                ...props.tabs.map(tab => this.renderTab(tab.id)), 
                this.renderAddButton()
            ],
            activeIndex: props.activeTab
        }
    }

    renderTab(tabId) {
        return {
            tabId,
            menuItem: (
                <Menu.Item key={tabId}>
                  NewTab <Icon name='close' onClick={ ($e) => { this.closeTab(tabId); $e.stopPropagation();  } } />
                </Menu.Item>
            ),
            render: () => <Tab.Pane className='tab-container'>
                <p>{ tabId }</p>
                <TabPaneComponent tabId={tabId}></TabPaneComponent>
            </Tab.Pane>
        }
    }

    renderAddButton() {
        return {
            menuItem: (
                <Menu.Item key='add-button' onClick={ ($e) => { this.addTab(); $e.stopPropagation();  } }>
                  <Icon name='plus'/>
                </Menu.Item>
            ),
        }
    }

    addTab() {
        this.props.newTab()
    }

    closeTab(deleteTabId) {
        if(this.state.panes.length === 2) { return }
        this.props.closeTab(deleteTabId)
    }

    handleTabChange(e, { activeIndex }) { 
        this.props.setActiveTab(activeIndex); 
    }

    render() {
        const { activeIndex, panes } = this.state
        return (
            <Tab  
            className="tab-component"
            activeIndex={activeIndex}
            onTabChange={this.handleTabChange}
            panes={panes} />
        )
    }
}

const tabComponent = connect(mapStateToProps, mapDispatchToProps)(TabComponent)

export default tabComponent;
