<template>
  <div class="conversation-line">
    <b>{{ item.role }}: </b> {{ item.content }}
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
