<script setup lang="ts">
import '../input/inputStyle/style.css';
import { computed, ref } from "vue";
import { useTodoStore } from "../../../stores/todoStore/todoStore.ts";
import ButtonSpinner from "../Spinner/ButtonSpinner.vue";

const store = useTodoStore();
const isCreating = computed(() => store.isCreating);
const task = ref('');

const onSubmit = async (event: Event) => {
  event.preventDefault();

  await store.createTodos({
    task: task.value,
    isDone: false,
  });

  task.value = '';
};
</script>

<template>
  <div class="form-container">
    <form class="input-form" @submit="onSubmit">
      <input
        type="text"
        class="task-input"
        required
        placeholder="Enter a task..."
        v-model="task"
      />
      <button type="submit" :disabled="isCreating" class="create-button">
        <template v-if="isCreating">
          <ButtonSpinner />
        </template>
        <template v-else>
          Create
        </template>
      </button>
    </form>
  </div>
</template>
