import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import { User, UserClient } from './clients/user';

class State {
  readonly users: User[] = [];
  readonly modalIsOpen: boolean = false;
  readonly modalUserName: string = '';
}

export class Users extends PureComponent<{}, State> {
  readonly state = new State();

  componentDidMount = () => {
    const userClient = new UserClient();
    userClient
      .getUsers()
      .then((users: User[]) => {
        console.info(`${users.length} users found`);
        this.setState({
          users
        });
      })
      .catch(e => {
        console.error(e);
      });
  };

  openUserModal = () => {
    this.setState({
      modalIsOpen: true
    });
  };

  closeUserModal = () => {
    this.setState({
      modalIsOpen: false,
      modalUserName: ''
    });
  };

  updateModalUserName = (name: string) => {
    this.setState({
      modalUserName: name
    });
  };

  addUser = () => {
    const userClient = new UserClient();
    userClient
      .createUser(this.state.modalUserName)
      .then((user: User) => {
        console.info(`user ${user.name} created`);
        const users = Object.assign([], this.state.users);
        users.push(user);

        this.setState({
          modalIsOpen: false,
          modalUserName: '',
          users
        });
      })
      .catch(e => {
        console.error(e);
      });
  };

  render = () => {
    const { users } = this.state;

    return (
      <div>
        <ul style={{ listStyleType: 'none', textAlign: 'left' }}>
          {users.map((user: User) => (
            <li key={user.id}>
              <Link
                to={`/${user.id}`}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  margin: '20px'
                }}
              >
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={this.openUserModal}>Add user</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Add User"
          onRequestClose={this.closeUserModal}
        >
          <div>
            <h1>Add User</h1>
            <div style={{ margin: '20px' }}>
              <label>
                <span>Name: </span>
                <input
                  type="text"
                  value={this.state.modalUserName}
                  onChange={e => this.updateModalUserName(e.target.value)}
                />
              </label>
            </div>
            <div style={{ margin: '20px' }}>
              <button
                onClick={this.addUser}
                style={{ margin: '5px', padding: '5px' }}
              >
                Add
              </button>
              <button
                onClick={this.closeUserModal}
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
