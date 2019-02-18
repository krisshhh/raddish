import React, { Component } from 'react'
import { connect } from "react-redux";
import { Input, Menu, Segment, Icon } from 'semantic-ui-react'
import { setActiveMenu } from './../../actions/dashboard.actions'
import PublishComponent from './publish'

const mapStateToProps = ({ dashboard }) => {
  const activeTab = dashboard.activeTab;
  const tab = dashboard.tabs[activeTab];
  return { ...tab };
};

function mapDispatchToProps(dispatch) {
  return {
      setActiveMenu: menuId => dispatch(setActiveMenu(menuId))
  };
}

class TabPaneComponent extends Component {

    constructor(props, context){
        super(props, context)
        this.state = { 
            ...props,
            activeItem: props.activeMenu
        }
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ activeItem: nextProps.activeMenu })
    }

    handleItemClick = (e, { name }) => {
      this.props.setActiveMenu(name);
    }

    render() {
        switch(this.state.activeItem) {
          case 'publish':
            return <PublishComponent></PublishComponent>
            break;
          default:
            return this.renderMenu();
            break; 
        }
    }

    renderMenu() {
      const { activeItem, id } = this.state
      return (
        <div>
            <Menu compact icon='labeled' size='massive'>
              <Menu.Item name='tap' onClick={this.handleItemClick} >
                <Icon name='spy' /> Tap
              </Menu.Item>

              <Menu.Item name='subscribe' onClick={this.handleItemClick} >
                <Icon name='level down alternate' /> Subscribe
              </Menu.Item>

              <Menu.Item name='publish' onClick={this.handleItemClick} >
                <Icon name='pushed' /> Publish
              </Menu.Item>
            </Menu>
        </div>   
      )
    }
}

const tabPaneComponent = connect(mapStateToProps, mapDispatchToProps)(TabPaneComponent)

export default tabPaneComponent;