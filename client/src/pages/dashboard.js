import React, { Component } from 'react';
import { Container, Menu, Icon, Header, Grid, Segment, Dimmer, Loader, Button } from 'semantic-ui-react'
import HeaderComponent from './../components/Header';
import TabComponent from './../components/Tab'; 
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

const mapStateToProps = state => {
  return { ...state.radish };
};

function mapDispatchToProps(dispatch) {
  return {};
}

class DashboardComponent extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { 
        ...props,
        activeItem: 'bio'
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    // if (this.props.loggedIn === false) {
    //     return <Redirect to='/' />
    // }
    const { activeItem } = this.state
    return (
        <Segment className="page dashboard">
            <Grid className="dashboard-container">
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <HeaderComponent></HeaderComponent>
                    </Grid.Column>
                    <Grid.Row columns={1} centered>
                        <TabComponent></TabComponent>
                    </Grid.Row>
                </Grid.Row>
            </Grid>
        </Segment>
    );
  }
}

const dashboardComponent = withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardComponent));

export default dashboardComponent;
