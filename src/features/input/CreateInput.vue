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
        placeholder="Enter a task..."
      />
    </form>
    <button class="create-button">Create</button>
  </div>
</template>


