<template>
  <div
    v-for="menuItem in menuItems"
    :key="menuItem.linkText"
    >
    <div
      v-if="menuItem.visible"
      @click="$emit('click')"
      >
      <RouterLink :to="menuItem.route">{{ menuItem.linkText }}</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { RouterLink } from 'vue-router'
import { useAuthStore } from "@/stores/authStore"

const authStore = useAuthStore()

defineEmits(["click"]);

const menuItems = ref([
  {
    linkText: "Home",
    route: "/",
    visible: true
  },
  {
    linkText: "About",
    route: "/about",
    visible: true
  },
  {
    linkText: "Login/Register",
    route: "/login",
    visible: !authStore.isLoggedIn
  },
  {
    linkText: "Chat",
    route: "/app-home",
    visible: authStore.isLoggedIn
  },
  {
    linkText: "Review",
    route: "/flashcards",
    visible: authStore.isLoggedIn
  },
  {
    linkText: "Conversations",
    route: "/previous-conversations",
    visible: authStore.isLoggedIn
  },
  {
    linkText: "Preferences",
    route: "/user-details",
    visible: authStore.isLoggedIn
  },
])
</script>
