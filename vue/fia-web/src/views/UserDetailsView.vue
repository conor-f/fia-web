<template>
  <div class="pt-4 flex flex-col items-center gap-3">
    <div class="">
      You've logged in {{ timesLoggedIn }} times.
    </div>

    <select class="select select-bordered w-ful max-w-xs">
      <option
        v-for="(language, index) in languageOptions"
        :key="language.languageCode"
        :value="language.languageCode"
        >
        {{ language.languageWord }}
      </option>
    </select>
    <div class="flex flex-row gap-2">
      <button
        class="btn btn-primary"
        @click="handleLogoutClick"
        >
        Logout
      </button>
      <button
        @click="handleDeleteClick"
        color="danger"
        class="btn btn-secondary"
        >
        Delete Account
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { getUserDetails, deleteAccount } from "@/utils/api"
import { useToast } from "vue-toastification"
import { useAuthStore } from "@/stores/authStore"

import { useRouter } from "vue-router";

const authStore = useAuthStore()
const router = useRouter();
const toast = useToast();

const timesLoggedIn = ref(0);
const languageOptions = ref([
  {
    language_code: "de",
    languageWord: "German",
    selected: false
  },
  {
    languageCode: "it",
    languageWord: "Italian",
    selected: false
  },
  {
    language_code: "es",
    languageWord: "Spanish",
    selected: false
  },
  {
    language_code: "nl",
    languageWord: "Dutch",
    selected: false
  },
  {
    language_code: "fr",
    languageWord: "French",
    selected: false
  },
]);

onMounted(() => {
  getUserDetails()
    .then(response => {
      timesLoggedIn.value = response["data"]["times_logged_in"];
    })
    .catch(error => {
      console.log(error);
    });
});

function handleLogoutClick() {
  authStore.clearTokens();
  router.push({ path: "/" });
  toast.success("Logout successful");
}

function handleDeleteClick() {
  deleteAccount()
    .then(response => {
      authStore.clearTokens();
      toast.success("Account deleted successfully");
      router.push({ path: "/" });
    })
    .catch(error => {
      console.log(error);
      toast.error("Account deletion failed. Let me know!");
    });
}
</script>
