<template>
  <div class="conversation">
    <h3>
      CONVO {{ conversation_id }}
    </h3>

    <ConversationLine
      v-for="conversationLine in conversation"
      :item="conversationLine"
      :key="conversationLine"
      />
  </div>
</template>

<script lang="ts">
import { getConversation } from "@/utils/api"
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
    }
  },
  methods: {
    populateConversation() {
      getConversation(this.conversation_id)
        .then(response => {
          this.conversation = response.data.conversation
        });
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
