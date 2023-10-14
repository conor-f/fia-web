<template>
  <div class="pt-4 flex flex-col items-center gap-3">
    <div class="">
      You've logged in {{ timesLoggedIn }} times.
    </div>

    <select v-model="selectedLanguage" class="select select-bordered w-ful max-w-xs">
      <option
        v-for="(language, languageCode) in languageOptions"
        :key="languageCode"
        :value="languageCode"
        >
        {{ language.languageWord }}
      </option>
    </select>

    <button
      class="btn btn-primary"
      @click="handleSaveDetailsClick"
      >
      Save
    </button>

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
// @ts-nocheck
import { ref, onMounted } from "vue";

import { setUserDetails, getUserDetails, deleteAccount } from "@/utils/api"
import { useToast } from "vue-toastification"
import { useAuthStore } from "@/stores/authStore"

import { useRouter } from "vue-router";

const authStore = useAuthStore()
const router = useRouter();
const toast = useToast();

const timesLoggedIn = ref(0);
const selectedLanguage = ref("");
const languageOptions = ref({
  "de": {
    languageWord: "German",
    selected: false
  },
  "it": {
    languageWord: "Italian",
    selected: false
  },
  "es": {
    languageWord: "Spanish",
    selected: false
  },
  "nl": {
    languageWord: "Dutch",
    selected: false
  },
  "fr": {
    languageWord: "French",
    selected: false
  },
});

onMounted(() => {
  getUserDetails()
    .then(response => {
      timesLoggedIn.value = response["data"]["times_logged_in"];
      languageOptions.value[response["data"]["current_language_code"]]["selected"] = true;
      selectedLanguage.value = response["data"]["current_language_code"];
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

function handleSaveDetailsClick() {
  setUserDetails(selectedLanguage.value)
    .catch(error => {
      console.log(error);
    });
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
