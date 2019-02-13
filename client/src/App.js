import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import loginComponent from './pages/login';
import dashboardComponent from './pages/dashboard/dashboard'
import './App.css';

class App extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Router>
        <>
        <Route path="/" exact component={loginComponent} />
        <Route path="/dashboard" exact component={dashboardComponent} />
        </>
      </Router>
    );
  }
}

const app = connect()(App);

export default app;
