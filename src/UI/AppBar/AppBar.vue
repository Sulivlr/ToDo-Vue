<script setup lang="ts">
import '../AppBar/appbarStyle/style.css'

</script>

<template>
  <header class="app-bar">
    <h1 class="app-title">ToDo</h1>
  </header>
  <div class="date-time">
    {{
      new Date().toLocaleDateString('en-us', {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      })}}
  </div>
</template>
