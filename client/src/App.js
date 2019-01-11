import React, { Component } from 'react';
import { Container, Header,Breadcrumb, Icon, Grid, Search, Button, Image, Segment, Menu } from 'semantic-ui-react'
import './App.css';

class App extends Component {
  render() {
    return (
    <Grid columns={1}>
      <Grid.Row>
        <Grid.Column>
        {/* <Segment className="radish-header" clearing>
          <Header floated='left' as='h2' image='/icon.png' content='Radish' />
          <Button floated='right' icon='server' basic></Button>
        </Segment> */}
        <Menu fluid widths={3} borderless className="radish-nav">
          <Menu.Item>
            <Header  as='h2' className="radish-header" image='/icon.png' content='Radish' />
          </Menu.Item>
          <Menu.Item>
          <Header as='h5'>
            <Icon name='server' />
            <Header.Content>Servers</Header.Content>
          </Header>
          </Menu.Item>
          <Menu.Item>
          <Button.Group
            basic
            buttons={[
              { key: 'bold', icon: 'setting' },
              { key: 'underline', icon: 'plug' },
            ]}
          />
          </Menu.Item>
        </Menu>
        </Grid.Column>
        {/* <Grid.Column>
          <Search fluid />
          <Button
            primary
            content='Add'
            icon='add'
          />
          <Button
            positive
            content='Setting'
            icon='setting'
          />
        </Grid.Column> */}
      </Grid.Row>
    </Grid>
    );
  }
}

export default App;
