import axios from 'axios';

export class Task {
  readonly id: number;
  readonly name: string;
  readonly done: boolean;

  constructor(id: number, name: string, done: boolean) {
    this.id = id;
    this.name = name;
    this.done = done;
  }
}

export class TaskClient {
  readonly endpoint: string = 'http://localhost:3002';

  getTasks = async (userId: string): Promise<Task[]> => {
    const response = await axios.get<Task[]>(
      `${this.endpoint}/user/${userId}/tasks`
    );
    return response.data || [];
  };

  createTask = async (userId: string, name: string): Promise<Task> => {
    const response = await axios.post<Task>(
      `${this.endpoint}/user/${userId}/tasks`,
      {
        name
      }
    );
    return response.data;
  };

  updateTask = async (userId: string, task: Task): Promise<Task> => {
    const response = await axios.post<Task>(
      `${this.endpoint}/user/${userId}/task/${task.id}`,
      {
        done: task.done,
        name: task.name
      }
    );
    return response.data;
  };
}
