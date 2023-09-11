<template>

  <va-accordion v-model="expanded_list">
    <va-collapse
      v-for="(conversation, index) in conversations"
      :key="index"
      :item="conversation"
      :header="conversation.conversation_id"
      >
      <div>
        <ConversationComponent
          :conversation_id="conversation.conversation_id"
          />
      </div>
    </va-collapse>
  </va-accordion>

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
      expanded_list: [],
      conversations: [],
    };
  },
  created: function() {
    getConversationList()
      .then(response => {
        this.conversations = response.data.conversations;
        this.expanded_list = Array(this.conversations.length).fill(false);
      });
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
