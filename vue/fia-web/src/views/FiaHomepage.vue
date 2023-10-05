<template>
  <div
    class="flex flex-col min-h-screen
    bg-gradient-to-br from-red-500 to-orange-500"
    >

    <div class="md:hidden">
      <ResponsiveHomepage />
    </div>

    <div class="hidden md:inline-flex">
      <ResponsiveHomepage />
    </div>
  </div>
</template>

<script setup lang="ts">
import ResponsiveHomepage from "@/components/ResponsiveHomepage.vue"
</script>
