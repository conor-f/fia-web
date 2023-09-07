<template>
  <div class="conversation-list">
    <div
      v-for="conversation in conversations"
      :item="conversation"
      :key="conversation"
      >
      <!-- This is ugly but I don't want to fix type errors atm... -->
      {{ // @ts-ignore
      conversation.conversation_id }}
      <input
        type="button"
        @click="// @ts-ignore
        conversationButtonClickHandler(conversation.conversation_id)"
        value="View"
        />
    </div>
    <ConversationComponent
      v-if="should_show_conversation_details"
      :conversation_id="selected_conversation_id"
      />
  </div>
</template>

<script lang="ts">
import { getConversationList } from "@/utils/api"
import { toast } from "vue-sonner"

import ConversationComponent from "@/components/ConversationComponent.vue"

export default {
  name: 'ConversationListComponent',
  components: {
    ConversationComponent,
  },
  data: function() {
    return {
      conversations: [],
      selected_conversation_id: "",
      should_show_conversation_details: false,
    };
  },
  created: function() {
    getConversationList()
      .then(response => {
        this.conversations = response.data.conversations
      });
  },
  methods: {
    conversationButtonClickHandler(conversation_id: string) {
      this.selected_conversation_id = conversation_id
      this.should_show_conversation_details = true
    },
  }
}
</script>

<style scoped>
</style>
