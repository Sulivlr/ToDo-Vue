<script setup lang="ts">
import '../input/inputStyle/style.css';
</script>

<template>
  <div class="form-container">
    <form class="input-form">
      <input
        type="text"
        class="task-input"
        required
        placeholder="Task..."
      />
    </form>
    <button class="create-button">Create</button>
  </div>
  <div class="todo-card">
    <div class="todo-content">
      <h3 class="todo-title">Buy groceries</h3>
      <div class="todo-actions">
        <input type="checkbox" class="todo-checkbox"/>
        <button class="todo-delete-button">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
