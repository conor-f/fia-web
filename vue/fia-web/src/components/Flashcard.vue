<template>
  <va-card
    v-if="should_show_front"
    bordered
    outlined
    >
    What's wrong with the following:
    <br/>
    {{ item.front }}
    <va-button @click="should_show_front=!should_show_front">Flip</va-button>
  </va-card>

  <va-card
    v-if="! should_show_front"
    bordered
    outlined
    >
    {{ item.back }}
    <va-button @click="should_show_front=!should_show_front">Flip</va-button>
  </va-card>

</template>

<script lang="ts">
export default {
  name: 'Flashcard',
  props: [
    "item",
  ],
  data: function() {
    return {
      should_show_front: true,
    }
  },
  methods: {
    // TODO: Implement card feedback
  },
}
</script>

<style scoped>
</style>
