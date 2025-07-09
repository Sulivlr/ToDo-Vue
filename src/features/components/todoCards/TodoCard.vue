<script setup lang="ts">
import '../todoCards/cardStyle/style.css'
import {useTodoStore} from "../../../stores/todoStore/todoStore.ts";
import {computed} from "vue";
import Spinner from '../Spinner/Spinner.vue'
import ButtonSpinner from "../Spinner/ButtonSpinner.vue";

const store = useTodoStore();
const isFetching = computed(() => store.isFetching);
const isDeleting = computed(() => store.isDeleting);
const todos = computed(() => store.items);

const onStatusChange = (id: string) => {
  store.changeTodoStatus(id);
}

const onDelete = async (id: string) => {
  await store.deleteTodos(id);
  await store.fetchTodos();
}

const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toLocaleString();
};

</script>
<template>
  <div v-if="isFetching">
    <Spinner/>
  </div>
  <div v-else class="todo-container">
    <div v-for="todo in todos" :key="todo.id" class="todo-card">
      <h3 class="todo-title">{{ todo.task }}</h3>
      <div class="todo-center-card">
        <p class="todo-time">
          Выполнено: {{ formatDate(todo.createdAt) }}
        </p>
        <div v-if="todo.weather" :key="todo.weather.id" class="todo-weather">
          Погода на момент выполнения:
          {{ Math.round(todo.weather.main.temp - 273.15) }}°C
        </div>
      </div>
      <div class="todo-actions">
        <input
          type="checkbox"
          class="todo-checkbox"
          :checked="todo.isDone"
          @change="onStatusChange(todo.id)"
        />
        <button
          class="todo-delete-button"
          :disabled="isDeleting === todo.id"
          @click="onDelete(todo.id)"
        >
          <template v-if="isDeleting === todo.id">
            <ButtonSpinner/>
          </template>
          <template v-else>
            Delete
          </template>
        </button>
      </div>
    </div>
  </div>
</template>
