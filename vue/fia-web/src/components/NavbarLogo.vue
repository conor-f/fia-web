<template>
  <RouterLink to="/">
    <!-- TODO: Convert to proper data URL stuff for hover states etc -->
    <img
      class="min-h-8 h-8 pl-4 inline"
      src="/top_left_logo.svg"
      />
    <!--
      TODO: This seems like the wrong mental model for showing/hiding content
    -->
    <div class="hidden md:inline text-2xl pl-3">
      Fia
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
