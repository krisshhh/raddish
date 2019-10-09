import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import loginComponent from './pages/login';
import dashboardComponent from './pages/dashboard/dashboard'
import api from './services/api';
import './App.css';

class App extends Component {

  componentDidMount() {
    api.request('START');
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
