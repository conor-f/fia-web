<template>
    <va-navbar
    color="warning"
    class="mb-3"
  >
    <template #left>
      <RouterLink to="/">
        <img
          class="logo"
          src="/top_left_logo.svg"
          />
      </RouterLink>
    </template>

    <template #right>
      <va-navbar-item>
        <RouterLink to="/">Home</RouterLink>
      </va-navbar-item>

      <va-navbar-item>
        <RouterLink to="/about">About</RouterLink>
      </va-navbar-item>

      <va-navbar-item
        v-if="!authStore.isLoggedIn"
        >
        <RouterLink to="/login">Login/Register</RouterLink>
      </va-navbar-item>

      <va-navbar-item
        v-if="authStore.isLoggedIn"
        >
        <RouterLink to="/app-home">Chat</RouterLink>
      </va-navbar-item>

      <va-navbar-item
        v-if="authStore.isLoggedIn"
        >
        <RouterLink to="/flashcards">Review</RouterLink>
      </va-navbar-item>

      <va-navbar-item
        v-if="authStore.isLoggedIn"
        >
        <RouterLink to="/previous-conversations">Conversations</RouterLink>
      </va-navbar-item>

      <va-navbar-item>
        <va-icon
          name="search"
          color="textInverted"
        />
      </va-navbar-item>
      <va-navbar-item>
        <RouterLink to="/user-details">
        <va-icon
          name="person"
          color="textInverted"
          />
        </RouterLink>
      </va-navbar-item>
    </template>
  </va-navbar>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from "@/stores/authStore"

const authStore = useAuthStore()

/** TODO:
 * Add actual logo
 * Change color to match scheme
 * Make the Person icon do some dropdown magic for login/profile related stuff
 */
</script>

<style scoped>
.logo {
  height: 2rem;
  padding-left: 1rem;
}
</style>
