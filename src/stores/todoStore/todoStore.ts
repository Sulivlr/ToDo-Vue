import {defineStore} from "pinia";
import {ref} from "vue";
import type {Todo} from "../../types.ts";

export const useTodoStore = defineStore('todoStore', () => {
  const items = ref<Todo[]>([]);
  const isFetching = ref(false);
  const isCreating = ref(false);
  return {
    items,
    isFetching,
    isCreating
  }
});

