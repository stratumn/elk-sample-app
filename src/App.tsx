import React, { Component } from 'react';
import './App.css';
import { TodoList } from './Todo';
import { Users } from './Users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="NavBar">
          <Users />
        </div>
        <div className="Content">
          <TodoList />
        </div>
      </div>
    );
  }
}

export default App;
