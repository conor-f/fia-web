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
import { ref, watch } from "vue";

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore"

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);


defineProps({
  responsive: Boolean
});
defineEmits(["click"]);


const watchedIsLoggedIn = ref(false);

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
    visible: !watchedIsLoggedIn.value,
  },
  {
    linkText: "Chat",
    route: "/new-conversation",
    visible: watchedIsLoggedIn,
  },
  {
    linkText: "Review",
    route: "/flashcards",
    visible: watchedIsLoggedIn.value,
  },
  {
    linkText: "Conversations",
    route: "/previous-conversations",
    visible: watchedIsLoggedIn.value,
  },
  {
    linkText: "Preferences",
    route: "/user-details",
    visible: true,
  },
])

watch(isLoggedIn, (newValue, oldValue) => {
  console.log(newValue);
  watchedIsLoggedIn.value = newValue;
});
</script>
