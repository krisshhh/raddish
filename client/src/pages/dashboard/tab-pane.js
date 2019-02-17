import React, { Component } from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'

const mapStateToProps = ({ dashboard }) => {
  return dashboard;
};

// function mapDispatchToProps(dispatch) {
//   return {
//       newTab: () => dispatch(newTab()),
//       setActiveTab: index => dispatch(setActiveTab(index)),
//       closeTab: id => dispatch(closeTab(id))
//   };
// }

class TabPaneComponent extends Component {

    constructor(props, context){
        super(props, context)
        this.state = { 
            ...props,
            activeItem: 'tap'
        }
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick = (e, { name }) => {
      console.log(name);
      this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state
        return (
          <div>
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

export default TabPaneComponent;