import axios from 'axios';
import apm from '../apm';

export class User {
  readonly id: number;
  readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class UserClient {
  readonly endpoint: string = 'http://localhost:3001';

  getUsers = async (): Promise<User[]> => {
    const span = apm.startSpan('getUsers', 'app.request');

    const response = await axios.get<User[]>(`${this.endpoint}/users`);

    span.end();
    return response.data || [];
  };

  getUser = async (id: string): Promise<User> => {
    const span = apm.startSpan('getUser', 'app.request');

    const response = await axios.get<User>(`${this.endpoint}/user/${id}`);

    span.end();
    return response.data;
  };

  createUser = async (name: string): Promise<User> => {
    const span = apm.startSpan('createUser', 'app.request');

    const response = await axios.post<User>(`${this.endpoint}/users`, {
      name
    });

    span.end();
    return response.data;
  };
}
