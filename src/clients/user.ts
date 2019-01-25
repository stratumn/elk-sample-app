import axios from 'axios';

export class User {
  readonly id: string;
  readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class UserClient {
  readonly endpoint: string = 'http://localhost:3001';

  getUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(`${this.endpoint}/users`);
    return response.data;
  };

  getUser = async (id: string): Promise<User> => {
    const response = await axios.get<User>(`${this.endpoint}/user/${id}`);
    return response.data;
  };

  createUser = async (name: string): Promise<User> => {
    const response = await axios.post<User>(`${this.endpoint}/users`, {
      name
    });
    return response.data;
  };
}
