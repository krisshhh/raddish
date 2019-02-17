import React, { Component } from 'react'
import { connect } from "react-redux";
import { Input, Menu, Segment } from 'semantic-ui-react'
import { setActiveMenu } from './../../actions/dashboard.actions'

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
        const { activeItem, id } = this.state
        return (
          <div>
            <p>{ id }</p>
            <Menu pointing secondary>
              <Menu.Item name='tap' active={activeItem === 'tap'} onClick={this.handleItemClick} />
              <Menu.Item name='subscribe' active={activeItem === 'subscribe'} onClick={this.handleItemClick} />
              <Menu.Item name='publish' active={activeItem === 'publish'} onClick={this.handleItemClick} />            
            </Menu>
    
            <Segment>
              <img src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
            </Segment>
          </div>   
        )
    }
}

const tabPaneComponent = connect(mapStateToProps, mapDispatchToProps)(TabPaneComponent)

export default tabPaneComponent;