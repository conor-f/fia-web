<template>
    <va-navbar
      color="#db8374"
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
        <RouterLink to="/">
          <span class="link">Home</span>
        </RouterLink>
      </va-navbar-item>

      <va-navbar-item>
        <RouterLink to="/about">
          <span class="link">About</span>
        </RouterLink>
      </va-navbar-item>

      <va-navbar-item
        v-if="!authStore.isLoggedIn"
        >
        <RouterLink to="/login">
          <span class="link">Login/Register</span>
        </RouterLink>
      </va-navbar-item>

      <va-navbar-item
        v-if="authStore.isLoggedIn"
        >
        <RouterLink to="/app-home">
        <span class="link">Chat</span>
        </RouterLink>
      </va-navbar-item>

      <va-navbar-item
        v-if="authStore.isLoggedIn"
        >
        <RouterLink to="/flashcards">
        <span class="link">Review</span>
        </RouterLink>
      </va-navbar-item>

      <va-navbar-item
        v-if="authStore.isLoggedIn"
        >
        <RouterLink to="/previous-conversations">
        <span class="link">Conversations</span>
        </RouterLink>
      </va-navbar-item>

      <va-navbar-item
        v-if="authStore.isLoggedIn"
        >
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
</script>

<style scoped>
.logo {
  height: 2rem;
  padding-left: 1rem;
}

.link {
  color: black;
}
</style>
