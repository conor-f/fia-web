<template>
  <div class="user-details-container">
    <h1>This is the post-login homepage</h1>

    <h2>New Conversation</h2>
    <NewConversationComponent/>

    <h2>Previous Conversations</h2>
    <ConversationListComponent/>
  </div>
</template>

<script lang="ts">
import { toast } from "vue-sonner"
import NewConversationComponent from "@/components/NewConversationComponent.vue"
import ConversationComponent from "@/components/ConversationComponent.vue"
import ConversationListComponent from "@/components/ConversationListComponent.vue"

export default {
  name: 'AppHomeView',
  components: {
    NewConversationComponent,
    ConversationComponent,
    ConversationListComponent,
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
