<template>
  <div class="conversation-line">
    <div v-if='item.conversation_element.role=="user"'>
      <b>{{ item.conversation_element.role }}: </b> {{ item.conversation_element.message }}
    </div>

    <div v-else>
      <b>{{ item.conversation_element.role }}: </b> {{ item.conversation_element.response.conversation_response }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ConversationLine',
  props: [
    "item"
  ],
}
</script>

<style scoped>
</style>
