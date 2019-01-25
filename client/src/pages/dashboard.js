import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
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
    this.state = { ...props };
  }

  render() {
    return (
        <p>Dashboard</p>
    );
  }
}

const dashboardComponent = withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardComponent));

export default dashboardComponent;
