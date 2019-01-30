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

    getInitialTab(index) {
        return {
            index,
            menuItem: (
                <Menu.Item key={index}>
                  NewTab <Icon name='close' onClick={ ($e) => { this.closeTab(index); $e.stopPropagation();  } } />
                </Menu.Item>
            ),
            render: () => <Tab.Pane attached={false}>Tab { index } Content</Tab.Pane>
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
        const index = this.state.panes.length;
        const newTab = this.getInitialTab(uuid.v4());
        this.setState(state => {
            state.panes.splice(index-1, 0, newTab)
            return state;
        })
    }

    closeTab(index) {
        if(this.state.panes.length === 2) {
            return
        }
        let activeIndex = this.state.activeIndex;
        const activeTabIndex = this.state.panes[activeIndex].index;
        const panes = remove([ ...this.state.panes ], n => {
            return n.index !== index;
        })
        if (activeIndex === findIndex(this.state.panes, { 'index': index }) ){
            activeIndex = panes.length - 2;
        } else {
            activeIndex = findIndex(panes, { 'index': activeTabIndex })
        }
        this.setState({ activeIndex, panes })
    }

    handleTabChange(e, { activeIndex }) {
        this.setState({ activeIndex })
    }

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
