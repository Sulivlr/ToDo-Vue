export interface ApiTodo {
  task: string;
  isDone: boolean;
  createdAt: string;
}

export interface Todo extends ApiTodo {
  id: string;
}

export interface ApiTodos {
  [id: string]: ApiTodo;
}
