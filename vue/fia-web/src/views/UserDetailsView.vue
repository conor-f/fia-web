<template>
  <div class="pt-4 flex flex-col items-center gap-3">
    <div class="">
      You've logged in {{ timesLoggedIn }} times.
    </div>

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

<script lang="ts">
import { getUserDetails, deleteAccount } from "@/utils/api"
import { useToast } from "vue-toastification"
import { useAuthStore } from "@/stores/authStore"

const authStore = useAuthStore()
const toast = useToast();


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
