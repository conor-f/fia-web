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
      <va-navbar-item>Home</va-navbar-item>
      <va-navbar-item>About</va-navbar-item>
      <va-navbar-item>Login/Register</va-navbar-item>
      <va-navbar-item>Chat</va-navbar-item>
      <va-navbar-item>Review</va-navbar-item>
      <va-navbar-item>Conversations</va-navbar-item>
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
