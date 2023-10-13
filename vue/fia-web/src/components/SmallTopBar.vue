<template>
  <div
    class="flex flex-col w-full items-end pt-3"
    @scroll.prevent
    @wheel.prevent
    @touchmove.prevent
    >
    <HamburgerIcon
      class="h-6 w-6 justify-end
      stroke-1 text-black-500
      hover:stroke-2 hover:text-black-700"
      @click="isMenuVisible = true"
    />  

    <div
      v-if="isMenuVisible"
      class="absolute bg-background-50 z-[99] top-14 left-0 w-screen h-screen opacity-90"
      @click="isMenuVisible = false"
      >
    </div>

    <div
      v-if="isMenuVisible"
      class="absolute inset-y-0 right-0 z-[100]
      pt-12 pl-5 pr-5
      bg-background-50/60 text-primary-600 sm:w-2/3 md:w-1/3 h-screen"
      @click="isMenuVisible = false"
      >
      <NavBarMenuItems
        :responsive="true"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from 'vue-router'
import { useAuthStore } from "@/stores/authStore"

import NavBarMenuItems from "@/components/NavBarMenuItems.vue"
import HamburgerIcon from "@/assets/icons/HamburgerIcon.vue"

const authStore = useAuthStore()
const isMenuVisible = ref(false);
</script>
