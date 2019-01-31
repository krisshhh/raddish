import React, { Component } from "react";
import { Tab, Icon, Menu } from 'semantic-ui-react';
import { remove, findIndex } from 'lodash';
import uuid from 'uuid';

class TabComponent extends Component {
    constructor(props, context) {
        super(props, context)
        const inintalTab = this.getInitialTab(uuid.v4())
        this.addTab = this.addTab.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.state = {
            ...props,
            panes: [inintalTab, this.renderAddButton()],
            activeIndex: 0
        }
    }

    getInitialTab(tabId) {
        return {
            tabId,
            menuItem: (
                <Menu.Item key={tabId}>
                  NewTab <Icon name='close' onClick={ ($e) => { this.closeTab(tabId); $e.stopPropagation();  } } />
                </Menu.Item>
            ),
            render: () => <Tab.Pane attached={false}>Tab { tabId } Content</Tab.Pane>
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
        const panes = this.state.panes;
        const index = panes.length;
        const newTab = this.getInitialTab(uuid.v4());
        panes.splice(index-1, 0, newTab);
        this.setState({ panes })
    }

    closeTab(deleteTabId) {
        if(this.state.panes.length === 2) { return }
        const activeIndex = this.state.activeIndex;
        const activeTabId = this.state.panes[activeIndex].tabId;
        const deleteTabIndex = findIndex(this.state.panes, { 'tabId': deleteTabId })
        const panes = remove([ ...this.state.panes ], n => n.tabId !== deleteTabId)
        const nearestTabId = (activeIndex === panes.length - 1)? activeIndex - 1 : activeIndex; 
        const newActiveIndex = (activeIndex ===  deleteTabIndex)?
            nearestTabId : findIndex(panes, { 'tabId': activeTabId });
        this.setState({ activeIndex: newActiveIndex, panes })
    }

    handleTabChange(e, { activeIndex }) { this.setState({ activeIndex }) }

    render() {
        const { activeIndex, panes } = this.state
        return (
            <Tab 
            menu={{ secondary: true, pointing: true }} 
            activeIndex={activeIndex}
            onTabChange={this.handleTabChange}
            panes={panes} />
        )
    }
}

export default TabComponent;
