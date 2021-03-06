import React, { PureComponent } from 'react';
import Modal from 'react-modal';

import apm from './apm';
import { Task, TaskClient } from './clients/task';

interface Props {
  user: string;
}

class State {
  readonly tasks: Task[] = [];
  readonly modalIsOpen: boolean = false;
  readonly modalTaskName: string = '';
}

export class TodoList extends PureComponent<Props, State> {
  readonly state = new State();

  componentDidMount = () => {
    const tx = apm.startTransaction('Load Tasks', 'app.load');

    const { user } = this.props;
    apm.setUserContext({ id: user });

    const taskClient = new TaskClient();
    taskClient
      .getTasks(user)
      .then((tasks: Task[]) => {
        console.info(`${tasks.length} tasks found`);
        apm.setTags({ taskCount: tasks.length });

        this.setState({
          tasks
        });
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        tx.end();
      });
  };

  componentDidUpdate = (prevProps: Props) => {
    // If we're switching to a different user, load that user's state.
    if (prevProps.user !== this.props.user) {
      const tx = apm.startTransaction('Load Tasks', 'app.load');
      apm.setUserContext({ id: this.props.user });

      const taskClient = new TaskClient();
      taskClient
        .getTasks(this.props.user)
        .then((tasks: Task[]) => {
          console.info(`${tasks.length} tasks found`);
          apm.setTags({ taskCount: tasks.length });

          this.setState({
            tasks
          });
        })
        .catch(e => {
          console.error(e);
        })
        .finally(() => {
          tx.end();
        });
    }
  };

  changeTaskStatus = (id: string) => {
    const taskClient = new TaskClient();
    const task = this.state.tasks.find((t: Task) => t.id === parseInt(id));
    if (!task) {
      console.error(`task ${id} not found in current list`);
      return;
    }

    taskClient
      .updateTask(this.props.user, new Task(task.id, task.name, !task.done))
      .then((task: Task) => {
        console.info(`task ${task.id} successfully updated`);

        const tasks: Task[] = [];
        for (const t of this.state.tasks) {
          if (t.id === task.id) {
            tasks.push(task);
          } else {
            tasks.push(t);
          }
        }

        this.setState({
          tasks
        });
      })
      .catch(e => {
        console.error(e);
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
    const tx = apm.startTransaction('Add Task', 'app.click');
    apm.setUserContext({ id: this.props.user });

    const taskClient = new TaskClient();
    taskClient
      .createTask(this.props.user, this.state.modalTaskName)
      .then((task: Task) => {
        console.info(`task ${task.id} created`);
        apm.setTags({ taskId: task.id });

        const tasks = Object.assign([], this.state.tasks);
        tasks.push(task);

        this.setState({
          modalIsOpen: false,
          modalTaskName: '',
          tasks
        });
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        tx.end();
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
                  id={task.id.toString()}
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
