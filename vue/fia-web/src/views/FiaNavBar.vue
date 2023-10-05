<template>
  <div class="w-full inline-flex justify-between bg-base-100 py-2">

    <NavbarLogo />

    <!-- TODO: This can't be right... -->
    <div class="hidden md:inline-flex">
      <LargeTopBar />
    </div>

    <div class="inline-flex md:hidden">
      <SmallTopBar />
    </div>

  </div>
</template>

<script setup lang="ts">
import NavbarLogo from '@/components/NavbarLogo.vue';
import LargeTopBar from '@/components/LargeTopBar.vue';
import SmallTopBar from '@/components/SmallTopBar.vue';
</script>
