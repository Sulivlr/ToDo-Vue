import {defineStore} from "pinia";
import {ref, watch} from "vue";
import type {ApiTodo, Todo, Weather} from "../../types.ts";
import axiosApi from "../../axiosApi.ts";

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

  const fetchWeather = async () => {
    const {data: weather} = await axiosApi.get<Weather | null>(`/weather?appid=5f752d58b77db9b3d3faa06003260874&id=1528675`);
    if (weather === null) {
      return null;
    }
    items.value = items.value.map(todo => ({
      ...todo,
      weather: weather
    }));

    return weather;
  }


  const createTodos = async (task: ApiTodo) => {
    isCreating.value = true;
    try {
      const weather = await fetchWeather();
      if (weather === null) {
        return null;
      }

      const newTodo: Todo = {
        id: crypto.randomUUID(),
        task: task.task,
        isDone: false,
        createdAt: new Date().toISOString(),
        weather: weather,
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

