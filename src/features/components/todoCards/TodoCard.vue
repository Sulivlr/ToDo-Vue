<script setup lang="ts">
import '../todoCards/cardStyle/style.css'
import {useTodoStore} from "../../../stores/todoStore/todoStore.ts";
import {computed, ref} from "vue";
import Spinner from '../Spinner/Spinner.vue'
import ButtonSpinner from "../Spinner/ButtonSpinner.vue";

const store = useTodoStore();
const isFetching = computed(() => store.isFetching);
const isDeleting = computed(() => store.isDeleting);
const isEditing = computed(() => store.isEditing);
const activeTodos = computed(() => store.items);
const doneTodos = computed(() => store.completed);

const editingId = ref<string | null>(null);
const editText = ref('');

const onStatusChange = (id: string) => {
  store.changeTodoStatus(id);
}

const onDelete = async (id: string, isCompleted = false) => {
  await store.deleteTodos(id, isCompleted);
  await store.fetchTodos();
}

const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toLocaleString();
};



const startEdit = (todoId: string, currentText: string) => {
  editingId.value = todoId;
  editText.value = currentText;
};

const cancelEdit = () => {
  editingId.value = null;
  editText.value = '';
};

const saveEdit = (todoId: string) => {
  store.editTodo(todoId, editText.value);
  cancelEdit();
};
</script>

<template>
  <div v-if="isFetching">
    <Spinner/>
  </div>
  <div v-else class="todo-container">

    <h2>Active tasks</h2>
    <div v-for="todo in activeTodos" :key="todo.id" class="todo-card">
      <div class="todo-header">
        <h3 v-if="editingId !== todo.id" class="todo-title">{{ todo.task }}</h3>
        <div v-else class="edit-field">
          <input v-model="editText" class="edit-input" />
        </div>
      </div>

      <p class="todo-time">Created: {{ formatDate(todo.createdAt) }}</p>

      <div class="todo-actions">
        <input
          type="checkbox"
          class="todo-checkbox"
          :checked="todo.isDone"
          @change="onStatusChange(todo.id)"
        />

        <button
          class="todo-edit-button"
          v-if="editingId !== todo.id"
          @click="startEdit(todo.id, todo.task)"
        >
          <template v-if="isEditing === todo.id">
            <ButtonSpinner/>
          </template>
          <template v-else>
            Edit
          </template>
        </button>
        <div v-else class="edit-buttons">
          <button class="todo-save-button" @click="saveEdit(todo.id)">Save</button>
          <button class="todo-cancel-button" @click="cancelEdit">Cancel</button>
        </div>

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


    <h2 style="margin-top: 30px;">History of done tasks</h2>
    <div v-if="doneTodos.length === 0">No tasks done.</div>
    <div v-for="todo in doneTodos" :key="todo.id" class="todo-card done">
      <h3 class="todo-title">{{ todo.task }}</h3>
      <div>
        <p class="todo-time">Done: {{ formatDate(todo.completedAt!) }}</p>
        <div class="todo-weather" v-if="todo.weather">
          Weather during the execution: {{ Math.round(todo.weather.main.temp - 273.15) }}°C
        </div>
      </div>
      <div class="todo-actions">
        <button
          class="todo-delete-button"
          :disabled="isDeleting === todo.id"
          @click="onDelete(todo.id, true)"
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
