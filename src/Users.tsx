import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

class State {
  readonly users: string[] = [];
  readonly modalIsOpen: boolean = false;
  readonly modalUserName: string = '';
}

export class Users extends PureComponent<{}, State> {
  readonly state = new State();

  componentDidMount() {
    // TODO: fetch from service
    this.setState({
      users: ['alice', 'bob']
    });
  }

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
    const users = Object.assign([], this.state.users);
    users.push(this.state.modalUserName);

    this.setState({
      modalIsOpen: false,
      modalUserName: '',
      users
    });
  };

  render() {
    const { users } = this.state;

    return (
      <div>
        <ul style={{ listStyleType: 'none', textAlign: 'left' }}>
          {users.map((user: string) => (
            <li key={user}>
              <Link
                to={`/${user}`}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  margin: '20px'
                }}
              >
                {user}
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
  }
}
