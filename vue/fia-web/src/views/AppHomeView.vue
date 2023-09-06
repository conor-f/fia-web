<template>
  <div class="user-details-container">
    <h1>This is the post-login homepage</h1>

    <h2>New Conversation</h2>
    <ConversationComponent/>

    <h2>Previous Conversations</h2>
    <ConversationListComponent/>

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

import ConversationComponent from "@/components/ConversationComponent.vue"
import ConversationListComponent from "@/components/ConversationListComponent.vue"

const authStore = useAuthStore()

export default {
  name: 'AppHomeView',
  components: {
    ConversationComponent,
    ConversationListComponent,
  },
  data() {
    return {
      "timesLoggedIn": 0,
    }
  },
  created() {
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
@media (min-width: 1024px) {
  .user-details-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
