<template>
  <div class="user-details-container">
    <h1>This is a User Details page</h1>

    You've logged in {{ timesLoggedIn }} times.
  </div>
</template>

<script lang="ts">
import { getUserDetails } from "@/utils/api"


export default {
  name: 'UserDetailsView',
  data() {
    return {
      "timesLoggedIn": 0,
    }
  },
  created() {
    getUserDetails()
      .then(response => {
        this.timesLoggedIn = response["data"]["times_logged_in"];
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
