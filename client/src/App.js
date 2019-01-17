import React, { Component } from 'react';
import { Container, Header,Form, Icon, Grid, Search, Button, Image, Segment, Menu } from 'semantic-ui-react'
import { connect } from "react-redux";
import { login } from './actions/index'; 
import './App.css';

const mapStateToProps = state => {
  return { ...state.radish };
};

function mapDispatchToProps(dispatch) {
  return {
    login: details => dispatch(login(details))
  };
}

const initialState = {
  host: '',
  port: '',
  userName: '',
  password: ''
}

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const loginDetails = this.state;
    this.props.login(loginDetails);
    this.setState(initialState);
  }

  render() {
    return (
    <Grid>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Header as='h2' icon id="radish-header" textAlign='center'>
            <img className="logo" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMi4wMDQgNTEyLjAwNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyLjAwNCA1MTIuMDA0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMzk5RDREOyIgZD0iTTI1Ni4wMDIsMTQwLjkyNmwtOTEuNTE0LTM1LjE0M2MtMjEuMDc3LTguMi0zNC45ODUtMjguNDY3LTM1LjA1NS01MS4wODUgICBjLTAuMDE4LTIuMDM1LDAuMTA2LTQuMDYsMC4zNTItNi4wNzdDMTMyLjg4NiwyMC45NDUsMTU2LjI4LDAuMDE4LDE4NC4xMywwaDQuMzE2YzI3LjIxNiwwLDUwLjMwMiwyMC4wMDMsNTQuMTY4LDQ2Ljk0NiAgIEwyNTYuMDAyLDE0MC45MjZ6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMzk5RDREOyIgZD0iTTI1Ni4wMDIsMTQwLjkyNmwxMy4zODgtOTMuOThDMjczLjI1NywyMC4wMDMsMjk2LjM0MiwwLDMyMy41NTgsMGg0LjMxNiAgIGMyNy44NSwwLjAxOCw1MS4yNDQsMjAuOTQ1LDU0LjM0NCw0OC42MTljMC4yNDcsMi4wMTcsMC4zNyw0LjA0MywwLjM1Miw2LjA3N2MtMC4wNywyMi42MTktMTMuOTc4LDQyLjg4NS0zNS4wNTUsNTEuMDg1ICAgTDI1Ni4wMDIsMTQwLjkyNnoiLz4KPC9nPgo8cGF0aCBzdHlsZT0iZmlsbDojRDFGRkM1OyIgZD0iTTI1Ni4wMDIsMTQ5LjczM2MtMi43MzksMC01LjMyLTEuMjc3LTYuOTg1LTMuNDUzTDE2OS4yMSw0Mi4yNzhsMTMuOTc4LTEwLjcxOWw3Mi44MTQsOTQuODQzICBsNzEuNzIyLTk0LjgwOGwxNC4wNCwxMC42MzFMMjYzLjA0OCwxNDYuMjFDMjYxLjM4NCwxNDguNDMsMjU4Ljc3NywxNDkuNzMzLDI1Ni4wMDIsMTQ5LjczM3oiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0RFODhDNDsiIGQ9Ik0yMTIuNzgyLDQ2My45MzZjNC45MjQsNC45MjQsOS43MjQsOS45NjIsMTQuNDE4LDE1LjEyM2wxNS41OSwyNS41NDMgIGM0LjQ2Niw3LjI5MywxNC4wMDQsOS41OTIsMjEuMzA2LDUuMTE3YzIuMDg3LTEuMjc3LDMuODQtMy4wMyw1LjExNy01LjExN2wxNS41OS0yNS41NDNjMTkuODM1LTIxLjg5Niw0MS44ODEtNDEuNjcsNjUuNzk1LTU5LjAxMyAgYzE3Ljg4OS0xMi45MzksMzIuODA5LTI5LjU1LDQzLjc3NS00OC43MDdjLTE5Ljk1OSwxMC45NDgtNDEuMTU5LDE5LjQ3NC02My4xNDMsMjUuNDAyICBDMjk2Ljk4NSw0MjcuMzIxLDI1Ni42MDEsNDUwLjIzMSwyMTIuNzgyLDQ2My45MzZ6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM2NjJENTU7IiBkPSJNMzMxLjIzLDM5Ni43NDFjMjEuOTg0LTUuOTI4LDQzLjE4NS0xNC40NTQsNjMuMTQzLTI1LjQwMmMxMy4yNDctMjIuOTE4LDIwLjIwNS00OC45MjgsMjAuMTctNzUuMzk1ICBjMC00LjczOS0wLjI5OS05LjQwNy0wLjczMS0xNC4wNEMzOTUuMDk2LDMyNS44MDIsMzY2Ljg5MywzNjUuMDIzLDMzMS4yMywzOTYuNzQxeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRjc5N0RBOyIgZD0iTTExNy42MzEsMzcxLjMzOWMxMC45NjYsMTkuMTU3LDI1Ljg4NiwzNS43NjksNDMuNzc1LDQ4LjcwNyAgYzE4LjI1LDEzLjI1NiwzNS40MzQsMjcuOTMsNTEuMzc2LDQzLjg4OWM0My44MTktMTMuNzA1LDg0LjIwMy0zNi42MTQsMTE4LjQ0OC02Ny4xOTUgIEMyNTkuNDI4LDQxNi4yODUsMTgyLjg0NCw0MDcuMTc4LDExNy42MzEsMzcxLjMzOXoiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzgwMzg2QTsiIGQ9Ik0yNTYuMDAyLDE0MS4yNzhjLTg2LjQ4NC0xLjA1Ny0xNTcuNDU4LDY4LjE4Mi0xNTguNTQxLDE1NC42NjYgIGMtMC4wMzUsMjYuNDY4LDYuOTIzLDUyLjQ3NywyMC4xNyw3NS4zOTVjNjUuMjEzLDM1LjgzOSwxNDEuNzk3LDQ0Ljk0NiwyMTMuNTk5LDI1LjQwMmMzNS42NjMtMzEuNzE3LDYzLjg2Ni03MC45MzgsODIuNTgyLTExNC44MzcgIEM0MDUuMzY2LDIwMS4zMzksMzM3LjAwOCwxNDAuNDIzLDI1Ni4wMDIsMTQxLjI3OHoiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
            <Header.Content>Radish</Header.Content>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2} centered>
        <Grid.Column>
          <Segment inverted>
            <Form inverted size='small'>
              <Form.Group widths='equal'>
                <Form.Input fluid label='Host'
                  id="host"
                  value={this.state.host } 
                  onChange={this.handleChange }
                  placeholder='127.0.0.1' />
                <Form.Input fluid label='Port' 
                  id="port"
                  value={this.state.port } 
                  onChange={this.handleChange }
                  placeholder='5678' />
              </Form.Group>
              <Form.Input fluid label='Username' 
                  id="userName"
                  value={this.state.userName } 
                  onChange={this.handleChange }
                  placeholder='Username' />
              <Form.Input fluid label='Password'
                  id="password"
                  value={this.state.password } 
                  onChange={this.handleChange }
                  placeholder='Password' />
              <Button type='button' positive>Tap</Button>
              <Button type='submit' onClick={ this.handleSubmit } primary>Test</Button>
            </Form>
          </Segment>
          {/* <pre>{ JSON.stringify(this.props) }</pre> */}
        </Grid.Column>
      </Grid.Row>
    </Grid>
    );
  }
}

const app = connect(mapStateToProps, mapDispatchToProps)(App);

export default app;
