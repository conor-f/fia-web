<template>
  <div class="conversation-list">
    <div
      v-for="conversation in conversations"
      :item="conversation"
      :key="conversation"
      >
      {{ conversation.conversation_id }}
      <input
        type="button"
        @click="conversationButtonClickHandler(conversation.conversation_id)"
        value="View"
        />
    </div>
  </div>
</template>

<script lang="ts">
import { getConversationList } from "@/utils/api"
import { toast } from "vue-sonner"


export default {
  name: 'ConversationListComponent',
  data: function() {
    return {
      conversations: []
    };
  },
  created: function() {
    getConversationList()
      .then(response => {
        this.conversations = response.data.conversations
      });
  },
  methods: {
    conversationButtonClickHandler(conversation_id) {
      console.log(conversation_id)
    },
  }
}
</script>

<style scoped>
</style>
