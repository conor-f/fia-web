<template>
  <div
    class="absolute right-3 top-0.5 z-50"
    >
    <button
      class="text-black text-4xl font-bold opacity-70 hover:opacity-100 duration-300"
      @click="isMenuVisible = !isMenuVisible"
      >
      &#9776;
    </button>
  </div>

  <div
    class="absolute right-0 top-0 pt-12 pl-5 bg-black/30 text-white w-2/3 h-screen"
    v-if="isMenuVisible"
    >
    <NavBarMenuItems
      @click="isMenuVisible = !isMenuVisible"
      />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from 'vue-router'
import { useAuthStore } from "@/stores/authStore"

import NavBarMenuItems from "@/components/NavBarMenuItems.vue"

const authStore = useAuthStore()
const isMenuVisible = ref(false);
</script>
