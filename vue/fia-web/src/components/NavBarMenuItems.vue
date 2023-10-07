<template>
  <div
    v-for="menuItem in menuItems"
    :key="menuItem.linkText"
    >
    <div
      v-if="menuItem.visible"
      @click="$emit('click')"
      >
      <RouterLink :to="menuItem.route">
        <div
          v-if="responsive"
          class="text-text-950 font-bold
          border-solid border-b-2 border-secondary-200 border-opacity-90
          text-center pt-2.5 pb-1"
          >
          {{ menuItem.linkText }}
        </div>

        <div v-else
             class="text-text-950 pl-3"
             >
          {{ menuItem.linkText }}
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { RouterLink } from 'vue-router'
import { useAuthStore } from "@/stores/authStore"

const authStore = useAuthStore()

defineProps({
  responsive: Boolean
});
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
    route: "/new-conversation",
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
