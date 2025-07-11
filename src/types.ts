export interface ApiTodo {
  task: string;
  isDone: boolean;
  createdAt: string;
}

export interface Todo extends ApiTodo {
  id: string;
  weather: Weather | null;
  completedAt?: string | null;
}

export interface Weather {
  id: string;
  main: {
    temp: number;
  };
}
