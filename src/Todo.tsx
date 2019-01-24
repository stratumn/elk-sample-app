import React, { PureComponent } from 'react';
import Modal from 'react-modal';

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
  readonly modalIsOpen: boolean = false;
  readonly modalTaskName: string = '';
}

export class TodoList extends PureComponent<Props, State> {
  readonly state = new State();

  componentDidMount = () => {
    // TODO: fetch from service
    this.setState({
      tasks: [
        new Task('1', 'Do the laundry', false),
        new Task('2', 'Do the dishes', true)
      ]
    });
  };

  componentDidUpdate = (prevProps: Props) => {
    // If we're switching to a different user, load that user's state.
    if (prevProps.user !== this.props.user) {
      // TODO: fetch from service
      this.setState({
        modalIsOpen: false,
        modalTaskName: '',
        tasks: [
          new Task('1', 'Do the laundry', false),
          new Task('2', 'Do the dishes', true)
        ]
      });
    }
  };

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

  openTaskModal = () => {
    this.setState({
      modalIsOpen: true
    });
  };

  closeTaskModal = () => {
    this.setState({
      modalIsOpen: false,
      modalTaskName: ''
    });
  };

  updateModalTaskName = (name: string) => {
    this.setState({
      modalTaskName: name
    });
  };

  addTask = () => {
    const tasks = Object.assign([], this.state.tasks);
    tasks.push(new Task('42', this.state.modalTaskName, false));

    // TODO: send to the service
    this.setState({
      modalIsOpen: false,
      modalTaskName: '',
      tasks
    });
  };

  render = () => {
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
        <button onClick={this.openTaskModal}>Add task</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Add Task"
          onRequestClose={this.closeTaskModal}
        >
          <div>
            <h1>Add Task</h1>
            <div style={{ margin: '20px' }}>
              <label>
                <span>Name: </span>
                <input
                  type="text"
                  value={this.state.modalTaskName}
                  onChange={e => this.updateModalTaskName(e.target.value)}
                />
              </label>
            </div>
            <div style={{ margin: '20px' }}>
              <button
                onClick={this.addTask}
                style={{ margin: '5px', padding: '5px' }}
              >
                Add
              </button>
              <button
                onClick={this.closeTaskModal}
                style={{ margin: '5px', padding: '5px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  };
}
