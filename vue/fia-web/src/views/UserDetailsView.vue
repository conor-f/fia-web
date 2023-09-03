<template>
  <div class="user-details-container">
    <h1>This is a User Details page</h1>

    You've logged in {{ userDetails["times_logged_in"] }} times.
  </div>
</template>

<script lang="ts">
import { created } from "vue"
import { getUserDetails } from "@/utils/api.ts"


export default {
  name: 'UserDetailsView',
  data() {
    return {
      "userDetails": {},
    }
  },
  computed: {
    handle_login_button_press() {
      login(this.username, this.password);
    },
    handle_register_button_press() {
      register(this.username, this.password);
    },
  },
  created() {
    getUserDetails()
      .then(response => {
        this.userDetails = response["data"];
      })
      .catch(error => {
        console.log(error);
      });
  }
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
