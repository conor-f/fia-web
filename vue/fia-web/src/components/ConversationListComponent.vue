<template>
  <va-accordion v-model="expanded_list">
    <va-collapse
      v-for="(conversation, index) in conversations"
      :key="index"
      :item="conversation"
      :header="(conversation as any).conversation_intro"
      >
      <div>
        <ConversationComponent
          :conversation_id="(conversation as any).conversation_id"
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
      conversations: [],
    };
  },
  computed: {
    expanded_list() {
      return Array(this.conversations.length).fill(false);
    },
  },
  created: function() {
    getConversationList()
      .then(response => {
        this.conversations = response.data.conversations;
      });
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
