import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { ApiTodo, Todo, Weather } from "../../types.ts";
import axiosApi from "../../axiosApi.ts";

export const useTodoStore = defineStore('todoStore', () => {
  const items = ref<Todo[]>([]);
  const completed = ref<Todo[]>([]);

  const isFetching = ref(false);
  const isCreating = ref(false);
  const isDeleting = ref<string | null>(null);

  const loadLocalStorage = () => {
    try {
      const activeTodos = localStorage.getItem('todos');
      const completedTodos = localStorage.getItem('completed');

      if (activeTodos) {
        items.value = JSON.parse(activeTodos);
      }

      if (completedTodos) {
        completed.value = JSON.parse(completedTodos);
      }
    } catch (error) {
      console.error("Ошибка загрузки из localStorage:", error);
    }
  };

  watch([items, completed], ([newItems, newCompleted]) => {
    localStorage.setItem('todos', JSON.stringify(newItems));
    localStorage.setItem('completed', JSON.stringify(newCompleted));
  }, { deep: true });

  const fetchWeather = async () => {
    const { data: weather } = await axiosApi.get<Weather | null>(`/weather?appid=5f752d58b77db9b3d3faa06003260874&id=1528675`);
    if (weather === null) {
      return null;
    }
    return weather;
  };

  const createTodos = async (task: ApiTodo) => {
    isCreating.value = true;
    try {
      const weather = await fetchWeather();
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        task: task.task,
        isDone: false,
        createdAt: new Date().toISOString(),
        weather: weather || null,
      };
      items.value.push(newTodo);
    } finally {
      isCreating.value = false;
    }
  };

  const deleteTodos = async (id: string, isCompleted = false) => {
    isDeleting.value = id;
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (isCompleted) {
        completed.value = completed.value.filter((item) => item.id !== id);
      } else {
        items.value = items.value.filter((item) => item.id !== id);
      }
    } finally {
      isDeleting.value = null;
    }
  };

  const fetchTodos = async () => {
    isFetching.value = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      loadLocalStorage();
    } finally {
      isFetching.value = false;
    }
  };

  const changeTodoStatus = async (id: string) => {
    isFetching.value = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const index = items.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        const todo = items.value.splice(index, 1)[0];
        todo.isDone = true;
        todo.completedAt = new Date().toISOString();
        todo.weather = await fetchWeather();
        completed.value.unshift(todo);
      }
    } finally {
      isFetching.value = false;
    }
  };

  loadLocalStorage();

  return {
    items,
    completed,
    isFetching,
    isCreating,
    isDeleting,
    createTodos,
    fetchTodos,
    changeTodoStatus,
    deleteTodos,
  }
});
