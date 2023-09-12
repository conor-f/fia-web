<template>
  <div class="conversation">
    <div v-if="! isActiveConversation">
      Welcome! Start a new conversation :)
    </div>
    <div v-else>
      <ConversationLine
        v-for="conversationLine in conversation"
        :item="conversationLine"
        :key="conversationLine"
        />
    </div>

    <textarea
      cols=60
      rows=3
      v-model="userMessage"
      class="mt-5"
      autofocus="true"
      @keyup.enter="handleConversationInput"
    />
    <input
      type="button"
      @click="handleConversationInput"
      value="Send"
    />
  </div>
</template>

<script lang="ts">
import { getConversation, converse } from "@/utils/api"
import { toast } from "vue-sonner"

import ConversationLine from "@/components/ConversationLine.vue"


export default {
  name: 'NewConversationComponent',
  components: {
    ConversationLine
  },
  data: function() {
    return {
      conversation: [],
      userMessage: "",
      conversation_id: "new",
    }
  },
  computed: {
    isActiveConversation: function() {
      return this.conversation_id != "new";
    },
  },
  methods: {
    handleConversationInput() {
      // @ts-ignore
      this.conversation.push({
        role: "user",
        message: this.userMessage
      });

      converse(this.conversation_id, this.userMessage)
        .then(response => {
          this.userMessage = "";

          console.log(response);
          this.conversation_id = response.data.conversation_id
          // @ts-ignore
          this.conversation.push({
            role: "system",
            message: response.data.conversation_response,
          });
          console.log(response.data.conversation_response);
        });
    },
  },
}
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
