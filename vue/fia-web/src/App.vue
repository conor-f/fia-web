<script setup lang="ts">
import { Toaster } from "vue-sonner"
import { RouterView } from 'vue-router'

import FiaNavBar from './components/FiaNavBar.vue';
import { faro } from '@grafana/faro-web-sdk';
</script>

<template>
  <Toaster />

  <div class="box">
    <div class="row header">
      <FiaNavBar />
    </div>

    <div class="row content">
      <RouterView />
    </div>

    <div class="row footer">
      <!-- TODO -->
    </div>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  flex-flow: column;
  height: 100vh;
  text-align: center;
}

.box .row.header {
  flex: 0 1 auto;
  /* The above is shorthand for:
  flex-grow: 0,
  flex-shrink: 1,
  flex-basis: auto
  */
}

.box .row.content {
  flex: 1 1 100%;
}

.box .row.footer {
  flex: 0 1 0px;
}
</style>
