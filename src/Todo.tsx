import React, { PureComponent } from 'react';

interface Props {
  user: string;
}

class Task {
  readonly id: string;
  readonly name: string;
  readonly done: boolean;

  constructor(id: string, name: string, done: boolean) {
    this.id = id;
    this.name = name;
    this.done = done;
  }
}

class State {
  readonly tasks: Task[] = [];
}

export class TodoList extends PureComponent<Props, State> {
  readonly state = new State();

  componentDidMount() {
    // TODO: fetch from service
    this.setState({
      tasks: [
        new Task('1', 'Do the laundry', false),
        new Task('2', 'Do the dishes', true)
      ]
    });
  }

  changeTaskStatus = (id: string) => {
    const tasks: Task[] = [];
    for (const task of this.state.tasks) {
      if (task.id === id) {
        tasks.push(new Task(task.id, task.name, !task.done));
      } else {
        tasks.push(new Task(task.id, task.name, task.done));
      }
    }

    // TODO: send request to service
    this.setState({
      tasks
    });
  };

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <ul style={{ listStyleType: 'none', textAlign: 'left' }}>
          {tasks.map((task: Task) => (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  id={task.id}
                  checked={task.done}
                  onChange={e => this.changeTaskStatus(e.target.id)}
                />
                <span>{task.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
