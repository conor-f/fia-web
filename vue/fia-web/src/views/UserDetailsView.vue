<template>
  <div class="user-details-container">
    <h1>This is a User Details page</h1>

  </div>
</template>

<script lang="ts">
import { login, register } from "@/utils/api.ts"
import { useAuthStore } from "@/stores/authStore.ts"

const authStore = useAuthStore()


export default {
  name: 'UserDetailsView',
  data() {
    return {
      "username": "",
      "password": ""
    }
  },
  methods: {
    handle_login_button_press() {
      login(this.username, this.password);
    },
    handle_register_button_press() {
      register(this.username, this.password);
    },
  },
}
</script>

<style>
@media (min-width: 1024px) {
  .user-details-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
