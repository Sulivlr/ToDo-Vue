<script setup lang="ts">
import '../AppBar/appbarStyle/style.css'
import {ref} from "vue";

const search = ref('');

const clearInput = () => {
  search.value = '';
};
</script>

<template>
  <header class="app-bar">
    <RouterLink to="/" @click.prevent="clearInput" class="app-title">ToDo</RouterLink>
    <DayNightButton />
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
