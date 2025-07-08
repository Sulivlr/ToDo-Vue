<template>
  <div id="loader">
    <div class="loader-inner">
      <div class="loader-line-wrap" v-for="n in 5" :key="n">
        <div class="loader-line"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../Spinner/spinnerStyle/style.css'
</script>
