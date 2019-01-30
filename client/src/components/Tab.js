import React, { Component } from "react";
import { Tab, Icon, Menu } from 'semantic-ui-react';
import { remove, findIndex } from 'lodash';
import uuid from 'uuid';

class TabComponent extends Component {
    constructor(props, context) {
        super(props, context)
        const inintalTab = this.getInitialTab(uuid.v4())
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.state = {
            ...props,
            panes: [inintalTab],
            activeIndex: 0
        }
    }

    handleItemClick() {
        const index = this.state.panes.length;
        const newTab = this.getInitialTab(uuid.v4());
        this.setState(state => {
            state.panes.push(newTab)
            return state;
        })
    }

    closeTab(index) {
        if(this.state.panes.length === 1) {
            return
        }
        let activeIndex = this.state.activeIndex;
        const activeTabIndex = this.state.panes[activeIndex].index;
        const panes = remove([ ...this.state.panes ], n => {
            return n.index !== index;
        })
        if (activeIndex === findIndex(this.state.panes, { 'index': index }) ){
            activeIndex = panes.length - 1;
        } else {
            activeIndex = findIndex(panes, { 'index': activeTabIndex })
        }
        this.setState({ activeIndex, panes })
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

    handleTabChange(e, { activeIndex }) {
        this.setState({ activeIndex })
    }

    render() {
        const { activeIndex, panes } = this.state
        return (
            <>
            <Icon name='plus circle' onClick={ this.handleItemClick } />
            <Tab 
                menu={{ secondary: true, pointing: true }} 
                activeIndex={activeIndex}
                onTabChange={this.handleTabChange}
                panes={panes} />
            </>
        )
    }
}

export default TabComponent;
