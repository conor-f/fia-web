<script setup lang="ts">
import { Toaster } from "vue-sonner"
import { RouterView } from 'vue-router'

import FiaNavBar from './views/FiaNavBar.vue';
import { faro } from '@grafana/faro-web-sdk';
</script>

<template>
  <Toaster />

  <div class="bg-background-50">
    <FiaNavBar />
    <RouterView />
  </div>
</template>
