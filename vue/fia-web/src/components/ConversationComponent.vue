<template>
  <div class="conversation">
    <h3>
      CONVO {{ conversation_id }}
    </h3>

    <div
      v-if=isNewConversation
      >
      Welcome! Start a new conversation :)

      <input
        type="textarea"
        size=60
        v-model="userMessage"
      />
      <input
        type="button"
        @click="handleConversationInput"
        value="Send"
      />
    </div>

    <div v-else>
      <ConversationLine
        v-for="conversationLine in conversation"
        :item="conversationLine"
        :key="conversationLine"
        />
      <input
        type="text"
        v-model="userMessage"
      />
      <input
        type="button"
        @click="handleConversationInput"
        value="Send"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { getConversation, converse } from "@/utils/api"
import { toast } from "vue-sonner"

import ConversationLine from "@/components/ConversationLine.vue"


export default {
  name: 'ConversationComponent',
  props: [
    "conversation_id",
  ],
  components: {
    ConversationLine
  },
  data: function() {
    return {
      conversation: [],
      userMessage: "",
    }
  },
  computed: {
    isNewConversation: function() {
      return this.conversation_id == "new"
    },
  },
  methods: {
    handleConversationInput() {
      this.conversation.push({
        role: "user",
        content: this.userMessage
      })

      converse(this.conversation_id, this.userMessage)
        .then(response => {
          this.conversation_id = response.data.conversation_id
          // TODO: Different object than others returned
          this.conversation.push({
            role: "assistant",
            content: response.data.response.conversation_response
          })
        });
    },
    populateConversation() {
      if (!this.isNewConversation) {
        getConversation(this.conversation_id)
          .then(response => {
            this.conversation = response.data.conversation
          });
      }
    },
  },
  created() {
    this.populateConversation();
  },
  watch: {
    conversation_id: function(newVal, oldVal) {
      this.populateConversation();
    },
  },
}
</script>

<style scoped>
</style>
