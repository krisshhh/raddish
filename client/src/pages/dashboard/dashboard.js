import React, { Component } from 'react';
import { Container, Menu, Icon, Header, Grid, Segment, Dimmer, Loader, Button } from 'semantic-ui-react'
import HeaderComponent from './../../components/Header';
import TabComponent from './tab'; 
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

const mapStateToProps = ({ dashboard }) => {
  return dashboard;
};

function mapDispatchToProps(dispatch) {
  return {};
}

class DashboardComponent extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { 
        ...props
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    // if (this.props.loggedIn === false) {
    //     return <Redirect to='/' />
    // }
    return (
        <Segment className="page dashboard">
            {/* <div className="dashboard-header">
                <HeaderComponent></HeaderComponent>
            </div> */}
            <div className="dashboard-container">
                <TabComponent></TabComponent>
            </div>
        </Segment>
    );
  }
}

const dashboardComponent = withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardComponent));

export default dashboardComponent;
