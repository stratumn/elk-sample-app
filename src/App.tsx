import React, { Component } from 'react';
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
  matchPath
} from 'react-router-dom';
import './App.css';
import { TodoList } from './Todo';
import { Users } from './Users';

interface RouterProps {
  user: string;
}

class App extends Component<RouteComponentProps<RouterProps>> {
  render() {
    const routerProps = matchPath<RouterProps>(this.props.location.pathname, {
      path: '/:user'
    });

    return (
      <div className="App">
        <div className="NavBar">
          <Users />
        </div>
        <div className="Content">
          <Switch>
            <Route exact path="/">
              <div>
                <h2>Welcome to the TODO Sample App</h2>
                <div>
                  Use the left menu to add users and navigate to a user's TODO
                  list.
                </div>
              </div>
            </Route>
            <Route exact path="/:user">
              <TodoList user={routerProps ? routerProps.params.user : ''} />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
