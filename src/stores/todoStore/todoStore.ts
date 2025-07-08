import {defineStore} from "pinia";
import {ref, watch} from "vue";
import type {ApiTodo, Todo} from "../../types.ts";

export const useTodoStore = defineStore('todoStore', () => {
  const items = ref<Todo[]>([]);
  const isFetching = ref(false);
  const isCreating = ref(false);

  const loadLocalStorage = () => {
    const todos = localStorage.getItem('todos');
    try {
      if (todos) {
        items.value = JSON.parse(todos);
      }
    } catch (error) {
      console.error(error);
    }
  }

  watch(items, (newValue) => {
    localStorage.setItem('todos', JSON.stringify(newValue));
  });

  const createTodos = async (task: ApiTodo) => {
    isCreating.value = true;
    try {
      const newTodo = {
        id: crypto.randomUUID(),
        task: task.task,
        isDone: false,
      };
      items.value.push(newTodo);
    } finally {
      isCreating.value = false;
    }
  }

  loadLocalStorage();
  return {
    items,
    isFetching,
    isCreating,
    createTodos,
  }
});

