import React, { PureComponent } from 'react';

class State {
  readonly users: string[] = [];
}

export class Users extends PureComponent<{}, State> {
  readonly state = new State();

  render() {
    return (
      <div>
        <p>Alice</p>
        <p>Bob</p>
      </div>
    );
  }
}
