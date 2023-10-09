<template>
  <div class="mx-4 flex flex-col">
    <div
      v-for="(conversation, index) in conversations"
      :key="index"
      class="collapse collapse-arrow bg-background-200 mb-4"
      >
      <input type="radio" name="conversation-list-accordion"/>

      <div class="collapse-title text-xl font-medium">
        
        {{ // @ts-ignore
        conversation.conversation_intro }}
      </div>

      <div class="collapse-content">
        <!-- @vue-ignore -->
        <ConversationComponent
          :conversation_id="conversation.conversation_id"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getConversationList } from "@/utils/api"
import ConversationComponent from "@/components/ConversationComponent.vue"

export default {
  name: 'PreviousConversations',
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
