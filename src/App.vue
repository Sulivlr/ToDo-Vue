<script setup lang="ts">
import AppBar from "./UI/AppBar/AppBar.vue";
import CreateInput from "./features/input/CreateInput.vue";
import TodoCard from "./features/todoCards/TodoCard.vue";
</script>

<template>
  <header>
    <AppBar />
  </header>
  <main>
    <CreateInput />
    <TodoCard />
  </main>
</template>

