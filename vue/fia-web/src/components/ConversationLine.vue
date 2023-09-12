<template>
  <div class="conversation-line">
    <div v-if='item.role=="user"'>
      <b>{{ item.role }}: </b> {{ item.message }}
    </div>

    <div v-else>
      <b>{{ item.role }}: </b> {{ item.message }}
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
