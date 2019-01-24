import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class State {
  readonly users: string[] = [];
}

export class Users extends PureComponent<{}, State> {
  readonly state = new State();

  componentDidMount() {
    // TODO: fetch from service
    this.setState({
      users: ['alice', 'bob']
    });
  }

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
      </div>
    );
  }
}
