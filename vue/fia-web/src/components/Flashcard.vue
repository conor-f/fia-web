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
    <br/>
    <va-button @click="updateFlashcard(0)">Didn't Know</va-button>
    <va-button @click="updateFlashcard(1)">Hard to Remember</va-button>
    <va-button @click="updateFlashcard(2)">Remembered</va-button>
    <va-button @click="updateFlashcard(3)">Too Easy</va-button>
    <va-button @click="deleteFlashcard(3)">Irrelevant</va-button>
  </va-card>
</template>

<script lang="ts">
import { updateFlashcard, deleteFlashcard } from "@/utils/api"

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
    updateFlashcard(ease: number) {
      updateFlashcard(this.item.id, ease)
        .catch(error => {
          console.log(error);
        });
    },
    deleteFlashcard() {
      deleteFlashcard(this.item.id)
        .catch(error => {
          console.log(error);
        });
    },
  },
}
</script>

<style scoped>
</style>
