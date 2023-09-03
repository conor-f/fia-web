<template>
  <div class="user-details-container">
    <h1>This is a User Details page</h1>

    You've logged in {{ timesLoggedIn }} times.

    <input
      type="button"
      @click="handleLogoutClick"
      value="Logout"
      />
    <input
      type="button"
      @click="handleDeleteClick"
      value="Delete Account"
      />

  </div>
</template>

<script lang="ts">
import { getUserDetails, deleteAccount } from "@/utils/api"
import { toast } from "vue-sonner"
import { useAuthStore } from "@/stores/authStore"

const authStore = useAuthStore()


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
  },
  methods: {
    handleLogoutClick() {
      authStore.accessToken = null;
      authStore.refreshToken = null;
      this.$router.push({ path: "/" });
      toast.success("Logout successful");
    },
    handleDeleteClick() {
      this.handleLogoutClick();

      deleteAccount()
        .then(response => {
          toast.success("Account deleted successfully");
          this.$router.push({ path: "/" });
        })
        .catch(error => {
          console.log(error);
          toast.error("Account deletion failed. Let me know!");
        });
    },
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
