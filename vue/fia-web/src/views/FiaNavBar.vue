<template>
  <div class="w-full flex flex-row justify-between px-4 py-3">

    <div class="flex flex-row justify-between">
      <RouterLink to="/">
        <Logo
          class="h-12 w-12 inline align-middle"
          src="/top_left_logo.svg"
          />

        <div class="inline text-2xl text-text-950
          font-semibold pl-3 align-middle">
          Fia
        </div>
      </RouterLink>
    </div>

    <!-- TODO: This can't be right... -->
    <div>
      <div class="md:hidden align-middle">
        <SmallTopBar />
      </div>

      <div class="hidden md:inline-flex align-middle">
        <LargeTopBar />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import Logo from '@/assets/icons/Logo.vue'
import LargeTopBar from '@/components/LargeTopBar.vue';
import SmallTopBar from '@/components/SmallTopBar.vue';
</script>
