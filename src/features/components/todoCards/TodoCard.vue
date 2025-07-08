<script setup lang="ts">
import '../todoCards/cardStyle/style.css'
import {useTodoStore} from "../../../stores/todoStore/todoStore.ts";
import {computed, onMounted} from "vue";
import Spinner from "../Spinner/Spinner.vue";

const store = useTodoStore();
const isFetching = computed(() => store.isFetching);
const todos = computed(() => store.items);

onMounted(() => {
  store.fetchTodos();
})
</script>

<template>
  <div v-if="isFetching">
    <Spinner />
  </div>
  <div v-else>
    <div v-for="todo in todos" :key="todo.id" :class="{'comlited' : todo.isDone}" class="todo-card">
      <div class="todo-content">
        <h3 class="todo-title" :class="{'completed' : todo.isDone}">{{todo.task}}</h3>
        <div class="todo-actions">
          <input type="checkbox" class="todo-checkbox"/>
          <button class="todo-delete-button">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
