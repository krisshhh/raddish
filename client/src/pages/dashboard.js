import React, { Component } from 'react';
import { Container, Menu, Icon, Header, Grid, Segment, Dimmer, Loader, Button } from 'semantic-ui-react'
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
    const { activeItem } = this.state
    return (
        <Segment className="page dashboard">
            <Dimmer {...(false ? {active:true} : {})}>
                <Loader />
            </Dimmer>
            <Grid className="dashboard-container">
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Menu stackable inverted>
                            <Menu.Item>
                                <Header as='h5'>
                                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMi4wMDQgNTEyLjAwNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyLjAwNCA1MTIuMDA0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMzk5RDREOyIgZD0iTTI1Ni4wMDIsMTQwLjkyNmwtOTEuNTE0LTM1LjE0M2MtMjEuMDc3LTguMi0zNC45ODUtMjguNDY3LTM1LjA1NS01MS4wODUgICBjLTAuMDE4LTIuMDM1LDAuMTA2LTQuMDYsMC4zNTItNi4wNzdDMTMyLjg4NiwyMC45NDUsMTU2LjI4LDAuMDE4LDE4NC4xMywwaDQuMzE2YzI3LjIxNiwwLDUwLjMwMiwyMC4wMDMsNTQuMTY4LDQ2Ljk0NiAgIEwyNTYuMDAyLDE0MC45MjZ6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMzk5RDREOyIgZD0iTTI1Ni4wMDIsMTQwLjkyNmwxMy4zODgtOTMuOThDMjczLjI1NywyMC4wMDMsMjk2LjM0MiwwLDMyMy41NTgsMGg0LjMxNiAgIGMyNy44NSwwLjAxOCw1MS4yNDQsMjAuOTQ1LDU0LjM0NCw0OC42MTljMC4yNDcsMi4wMTcsMC4zNyw0LjA0MywwLjM1Miw2LjA3N2MtMC4wNywyMi42MTktMTMuOTc4LDQyLjg4NS0zNS4wNTUsNTEuMDg1ICAgTDI1Ni4wMDIsMTQwLjkyNnoiLz4KPC9nPgo8cGF0aCBzdHlsZT0iZmlsbDojRDFGRkM1OyIgZD0iTTI1Ni4wMDIsMTQ5LjczM2MtMi43MzksMC01LjMyLTEuMjc3LTYuOTg1LTMuNDUzTDE2OS4yMSw0Mi4yNzhsMTMuOTc4LTEwLjcxOWw3Mi44MTQsOTQuODQzICBsNzEuNzIyLTk0LjgwOGwxNC4wNCwxMC42MzFMMjYzLjA0OCwxNDYuMjFDMjYxLjM4NCwxNDguNDMsMjU4Ljc3NywxNDkuNzMzLDI1Ni4wMDIsMTQ5LjczM3oiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0RFODhDNDsiIGQ9Ik0yMTIuNzgyLDQ2My45MzZjNC45MjQsNC45MjQsOS43MjQsOS45NjIsMTQuNDE4LDE1LjEyM2wxNS41OSwyNS41NDMgIGM0LjQ2Niw3LjI5MywxNC4wMDQsOS41OTIsMjEuMzA2LDUuMTE3YzIuMDg3LTEuMjc3LDMuODQtMy4wMyw1LjExNy01LjExN2wxNS41OS0yNS41NDNjMTkuODM1LTIxLjg5Niw0MS44ODEtNDEuNjcsNjUuNzk1LTU5LjAxMyAgYzE3Ljg4OS0xMi45MzksMzIuODA5LTI5LjU1LDQzLjc3NS00OC43MDdjLTE5Ljk1OSwxMC45NDgtNDEuMTU5LDE5LjQ3NC02My4xNDMsMjUuNDAyICBDMjk2Ljk4NSw0MjcuMzIxLDI1Ni42MDEsNDUwLjIzMSwyMTIuNzgyLDQ2My45MzZ6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM2NjJENTU7IiBkPSJNMzMxLjIzLDM5Ni43NDFjMjEuOTg0LTUuOTI4LDQzLjE4NS0xNC40NTQsNjMuMTQzLTI1LjQwMmMxMy4yNDctMjIuOTE4LDIwLjIwNS00OC45MjgsMjAuMTctNzUuMzk1ICBjMC00LjczOS0wLjI5OS05LjQwNy0wLjczMS0xNC4wNEMzOTUuMDk2LDMyNS44MDIsMzY2Ljg5MywzNjUuMDIzLDMzMS4yMywzOTYuNzQxeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRjc5N0RBOyIgZD0iTTExNy42MzEsMzcxLjMzOWMxMC45NjYsMTkuMTU3LDI1Ljg4NiwzNS43NjksNDMuNzc1LDQ4LjcwNyAgYzE4LjI1LDEzLjI1NiwzNS40MzQsMjcuOTMsNTEuMzc2LDQzLjg4OWM0My44MTktMTMuNzA1LDg0LjIwMy0zNi42MTQsMTE4LjQ0OC02Ny4xOTUgIEMyNTkuNDI4LDQxNi4yODUsMTgyLjg0NCw0MDcuMTc4LDExNy42MzEsMzcxLjMzOXoiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzgwMzg2QTsiIGQ9Ik0yNTYuMDAyLDE0MS4yNzhjLTg2LjQ4NC0xLjA1Ny0xNTcuNDU4LDY4LjE4Mi0xNTguNTQxLDE1NC42NjYgIGMtMC4wMzUsMjYuNDY4LDYuOTIzLDUyLjQ3NywyMC4xNyw3NS4zOTVjNjUuMjEzLDM1LjgzOSwxNDEuNzk3LDQ0Ljk0NiwyMTMuNTk5LDI1LjQwMmMzNS42NjMtMzEuNzE3LDYzLjg2Ni03MC45MzgsODIuNTgyLTExNC44MzcgIEM0MDUuMzY2LDIwMS4zMzksMzM3LjAwOCwxNDAuNDIzLDI1Ni4wMDIsMTQxLjI3OHoiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                                    Radish
                                </Header>
                            </Menu.Item>
                            <Menu.Menu position='right'>
                                <Menu.Item name='tap' active={activeItem === 'tap'} onClick={this.handleItemClick}>
                                    <Icon name='question circle' />
                                </Menu.Item>
                                <Menu.Item name='tap' active={activeItem === 'tap'} onClick={this.handleItemClick}>
                                    <Icon name='setting' />
                                </Menu.Item>
                                <Menu.Item name='tap' active={activeItem === 'tap'} onClick={this.handleItemClick}>
                                    <Icon name='plug' />
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                    <Grid.Row columns={1} centered>
                        <div>
                            <Menu attached='top' tabular size='mini' inverted>
                            <Menu.Item name='New Tab' active={activeItem === 'bio'} onClick={this.handleItemClick} />
                            <Menu.Menu position='left'>
                            <Button circular icon="plus">
                            </Button>
                            </Menu.Menu>
                            </Menu>

                            <Segment attached='bottom'>
                            </Segment>
                        </div>
                    </Grid.Row>
                </Grid.Row>
            </Grid>
        </Segment>
    );
  }
}

const dashboardComponent = withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardComponent));

export default dashboardComponent;
