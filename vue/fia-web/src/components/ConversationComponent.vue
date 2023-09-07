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
    "prop_conversation_id",
  ],
  components: {
    ConversationLine
  },
  data: function() {
    return {
      conversation: [],
      userMessage: "",
      _conversation_id: undefined,
    }
  },
  computed: {
    isNewConversation: function() {
      return this.conversation_id == "new"
    },
    conversation_id: function() {
      if (this._conversation_id !== undefined) {
        return this._conversation_id
      } else {
        return this.prop_conversation_id
      }
    }
  },
  methods: {
    handleConversationInput() {
      console.log(this.userMessage)
      console.log(this.conversation_id)
      console.log(this._conversation_id)
      console.log(this.prop_conversation_id)
      this.conversation.push({
        role: "user",
        content: this.userMessage
      })

      converse(this.conversation_id, this.userMessage)
        .then(response => {
          this._conversation_id = response.data.conversation_id
          console.log(response.data)
          // TODO: Different object than others returned
          this.conversation.push({
            role: "system",
            content: response.data.response.conversation_response
          })
        });
    }
  },
  created() {
    console.log("hey")
    console.log(this.prop_conversation_id)
    console.log(this.conversation_id)
    console.log(this.isNewConversation)
    if (!this.isNewConversation) {
      getConversation(this.prop_conversation_id)
        .then(response => {
          this.conversation = response.data.conversation
        });
    }
  },
}
</script>

<style scoped>
</style>
