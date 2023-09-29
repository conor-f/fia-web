<template>
  <div class="flashcard">
    <va-card
      v-if="should_show_front"
      @click="should_show_front=!should_show_front"
      >
      <va-card-title>
        Correct the following
      </va-card-title>

      <va-card-content>
        {{ item.front }}
      </va-card-content>

      <va-card-actions align="right">
        <va-button>
          Flip
        </va-button>
      </va-card-actions>
    </va-card>

    <va-card
      v-if="! should_show_front"
      @click="should_show_front=!should_show_front"
      >
      <va-card-title>
        Solution
      </va-card-title>

      <va-card-content>
        {{ item.back }}
      </va-card-content>

      <va-card-actions align="center">
        <va-button @click="updateFlashcard(0)">Didn't Know</va-button>
        <va-button @click="updateFlashcard(1)">Hard</va-button>
        <va-button @click="updateFlashcard(2)">Easy</va-button>
        <va-button @click="updateFlashcard(3)">Too Easy</va-button>
        <va-button @click="deleteFlashcard()">Delete</va-button>
      </va-card-actions>
    </va-card>
  </div>
</template>

<script lang="ts">
import { updateFlashcard, deleteFlashcard } from "@/utils/api"

export default {
  name: 'Flashcard',
  props: [
    "item",
  ],
  emits: [
    "completed",
  ],
  data: function() {
    return {
      should_show_front: true,
    }
  },
  methods: {
    updateFlashcard(ease: number) {
      updateFlashcard(this.item.id, ease).then(_ => {
        this.$emit("completed");
      }).catch(error => {
          console.log(error);
        });
    },
    deleteFlashcard() {
      deleteFlashcard(this.item.id).then(_ => {
        this.$emit("completed");
      }).catch(error => {
          console.log(error);
        });
    }
  },
}
</script>

<style scoped>
.flashcard {
  padding: 1rem;
}
</style>
