<script setup lang="ts">
  import '../todoCards/cardStyle/style.css'
</script>

<template>
  <div class="todo-card">
    <div class="todo-content">
      <h3 class="todo-title">Buy groceries</h3>
      <div class="todo-actions">
        <input type="checkbox" class="todo-checkbox"/>
        <button class="todo-delete-button">Delete</button>
      </div>
    </div>
  </div>

  <div class="todo-card">
    <div class="todo-content">
      <h3 class="todo-title">Finish project</h3>
      <div class="todo-actions">
        <input type="checkbox" class="todo-checkbox"/>
        <button class="todo-delete-button">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
