<template>
    <h3 class="mt-3" >
      Review Flashcards
    </h3>

    <div class="mt-3 mb-3">
      You've logged in {{ timesLoggedIn }} times.
    </div>

    <va-button
      @click="handleLogoutClick"
      class="mr-3"
      >
      Logout
    </va-button>
    <va-button
      @click="handleDeleteClick"
      color="danger"
      class="ml-3"
      >
      Delete Account
    </va-button>
</template>

<script lang="ts">
import { getUserDetails, deleteAccount } from "@/utils/api"
import { toast } from "vue-sonner"
import { useAuthStore } from "@/stores/authStore"

const authStore = useAuthStore()


export default {
  name: 'ReviewFlashcards',
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
      authStore.clearTokens();
      this.$router.push({ path: "/" });
      toast.success("Logout successful");
    },
    handleDeleteClick() {
      deleteAccount()
        .then(response => {
          authStore.clearTokens();
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
</style>
