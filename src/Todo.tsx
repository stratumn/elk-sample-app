import React, { PureComponent } from 'react';

interface Props {
  user?: string;
}

class State {
  readonly tasks: string[] = [];
}

export class TodoList extends PureComponent<Props, State> {
  readonly state = new State();

  render() {
    return (
      <div>
        <p>Do the laundry</p>
        <p>Do the dishes</p>
      </div>
    );
  }
}
