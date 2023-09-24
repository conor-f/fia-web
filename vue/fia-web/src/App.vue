<script setup lang="ts">
import { Toaster } from "vue-sonner"
import { RouterView } from 'vue-router'

import FiaNavBar from './components/FiaNavBar.vue';
import { faro } from '@grafana/faro-web-sdk';
</script>

<template>
  <Toaster />

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
