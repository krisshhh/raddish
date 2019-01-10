import React, { Component } from 'react';
import { Container, Header, Icon } from 'semantic-ui-react'
import './App.css';

class App extends Component {
  render() {
    return (
      <Container fluid>
        <Header as='h2'>
          <Icon name='settings' />
          <Header.Content>
            Radish
            <Header.Subheader>Rabbitmq Client</Header.Subheader>
          </Header.Content>
        </Header>
      </Container>
    );
  }
}

export default App;
