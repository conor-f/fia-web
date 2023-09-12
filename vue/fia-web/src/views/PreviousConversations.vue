<template>
  <h2 class="mb-5">Previous Conversations</h2>
  <ConversationListComponent/>
</template>

<script lang="ts">
import { toast } from "vue-sonner"
import ConversationListComponent from "@/components/ConversationListComponent.vue"

export default {
  name: 'PreviousConversations',
  components: {
    ConversationListComponent,
  },
}
</script>

<style>
</style>
