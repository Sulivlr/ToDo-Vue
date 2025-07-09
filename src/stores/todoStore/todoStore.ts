import {defineStore} from "pinia";
import {ref, watch} from "vue";
import type {ApiTodo, Todo} from "../../types.ts";

export const useTodoStore = defineStore('todoStore', () => {
  const items = ref<Todo[]>([]);
  const isFetching = ref(false);
  const isCreating = ref(false);
  const isDeleting = ref<string | null>(null);

  const loadLocalStorage = () => {
    const todos = localStorage.getItem('todos');
    try {
      if (todos) {
        items.value = JSON.parse(todos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  watch(items, (newValue) => {
    localStorage.setItem('todos', JSON.stringify(newValue));
  }, {deep: true},
  );

  const createTodos = async (task: ApiTodo) => {
    isCreating.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newTodo = {
        id: crypto.randomUUID(),
        task: task.task,
        isDone: false,
      };
      items.value.push(newTodo);
    } finally {
      isCreating.value = false;
    }
  };

  const deleteTodos = async (id: string) => {
    isDeleting.value = id;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      items.value = items.value.filter((item) => item.id !== id);
    } finally {
      isDeleting.value = null;
    }
  };


  const fetchTodos = async () => {
    isFetching.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loadLocalStorage();
    } finally {
      isFetching.value = false;
    }
  };

  const changeTodoStatus = async (id: string) => {
    isFetching.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const todoIsDone = items.value.find((item) => item.id === id);
      if (todoIsDone) {
        todoIsDone.isDone = !todoIsDone.isDone;
      }
    } finally {
      isFetching.value = false;
    }
  };

  loadLocalStorage();
  return {
    items,
    isFetching,
    isCreating,
    createTodos,
    fetchTodos,
    changeTodoStatus,
    isDeleting,
    deleteTodos,
  }
});

