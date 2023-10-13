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


const watchedIsLoggedIn = ref(authStore.isLoggedIn);
const watchedIsNotLoggedIn = ref(!authStore.isLoggedIn);


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
    visible: watchedIsNotLoggedIn,
  },
  {
    linkText: "Chat",
    route: "/new-conversation",
    visible: watchedIsLoggedIn,
  },
  {
    linkText: "Review",
    route: "/flashcards",
    visible: watchedIsLoggedIn,
  },
  {
    linkText: "Conversations",
    route: "/previous-conversations",
    visible: watchedIsLoggedIn,
  },
  {
    linkText: "Preferences",
    route: "/user-details",
    visible: watchedIsLoggedIn,
  },
])

// This looks so silly, but it's the only way this would work. The reason for
// the watchedIsNotLoggedIn is that using !watchedIsLoggedIn didn't work in the
// array above as it required the value, and converting it to the value meant
// that it wasn't recomputed on change.
watch(isLoggedIn, (newValue, oldValue) => {
  watchedIsLoggedIn.value = newValue;
  watchedIsNotLoggedIn.value = !newValue;
});
</script>
