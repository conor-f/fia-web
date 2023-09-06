<template>
  <div class="conversation">
    <h3>
      CONVO
    </h3>

    <ConversationLine
      v-for="conversationLine in conversation"
      :item="conversationLine"
      :key="conversationLine"
      />
  </div>
</template>

<script lang="ts">
import { getUserDetails, deleteAccount } from "@/utils/api"
import { toast } from "vue-sonner"

import ConversationLine from "@/components/ConversationLine.vue"


export default {
  name: 'ConversationComponent',
  components: {
    ConversationLine
  },
  computed: {
    conversation: function() {
      return [
        {
          role: "system",
          content: "paosifd"
        },
        {
          role: "system",
          content: "paosifd"
        },
        {
          role: "system",
          content: "paosifd"
        },
      ]
      return getUserConversation()
        .catch(error => {
          console.log(error)
        }
      );
    }
  },
  methods: {
    submitMessageClick() {
      submitMessage(message)
        .then(response => {
          console.log(response)
          toast.success("Got response :)")
          // TODO: Push response data onto conversation component
        }).catch(error => {
          console.log(error)
        });
    },
  }
}
</script>

<style scoped>
</style>
