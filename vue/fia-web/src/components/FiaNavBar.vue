<template>
    <va-navbar
    color="warning"
    class="mb-3"
  >
    <template #left>
      <va-navbar-item class="logo">
        FIA
      </va-navbar-item>
    </template>

    <template #right>
      <va-navbar-item>
        <RouterLink to="/">Home</RouterLink>
      </va-navbar-item>

      <va-navbar-item>
        <RouterLink to="/about">About</RouterLink>
      </va-navbar-item>

      <va-navbar-item>
        <RouterLink to="/login">Login/Register</RouterLink>
      </va-navbar-item>

      <va-navbar-item>
        <RouterLink to="/app-home">Chat</RouterLink>
      </va-navbar-item>

      <va-navbar-item>
        <RouterLink to="/user-details">Review</RouterLink>
      </va-navbar-item>

      <va-navbar-item>
        <RouterLink to="#">Conversations</RouterLink>
      </va-navbar-item>

      <va-navbar-item>
        <va-icon
          name="search"
          color="textInverted"
        />
      </va-navbar-item>
      <va-navbar-item>
        <va-icon
          name="person"
          color="textInverted"
        />
      </va-navbar-item>
    </template>
  </va-navbar>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

/** TODO:
 * Add computed property to read the store and hide pages based on login status
 * Make navbar-items RouterLinks
 * Add actual logo
 * Change color to match scheme
 * Make the Person icon do some dropdown magic for login/profile related stuff
 */
</script>

<style scoped>
.logo {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>
