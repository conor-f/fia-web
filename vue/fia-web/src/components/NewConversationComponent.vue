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

    <va-inner-loading :loading="response_loading">
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
    </va-inner-loading>
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
      response_loading: false,
    }
  },
  computed: {
    isActiveConversation: function() {
      return this.conversation_id != "new";
    },
  },
  methods: {
    handleConversationInput() {
      this.response_loading = true;

      const messageCopy = this.userMessage.slice();
      this.userMessage = "";

      // @ts-ignore
      this.conversation.push({
        role: "user",
        message: messageCopy
      });


      converse(this.conversation_id, messageCopy)
        .then(response => {
          this.conversation_id = response.data.conversation_id
          this.conversation[this.conversation.length - 1].learning_moments = response.data.learning_moments.learning_moments

          // @ts-ignore
          this.conversation.push({
            role: "system",
            message: response.data.conversation_response,
          });

          this.response_loading = false;
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
