<script setup lang="ts">
import { RouterView } from 'vue-router'

import FiaNavBar from './components/FiaNavBar.vue';
</script>

<template>
  <FiaNavBar />
  <div class="router-container">
    <RouterView />
  </div>
</template>

<style scoped>
.router-container {
  width: 100%;
  text-align: center;
}
</style>
