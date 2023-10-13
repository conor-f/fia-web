<template>
  <div class="card bg-background-100 w-100 shadow-xl"
    @click="should_show_front = !should_show_front">
    <div class="card-body">
      <div class="card-title">
        <span v-if="should_show_front">Answer the Following</span>
        <span v-if="!should_show_front">Solution</span>
      </div>

      <p v-if="should_show_front" class="pt-2 flex prose justify-center">{{ item.front }}</p>
      <p v-if="!should_show_front" class="prose">{{ item.back }}</p>

      <div class="card-actions justify-end">
        <div v-if="should_show_front">
          <button class="btn btn-success">
            Flip
          </button>
        </div>
        <div v-if="!should_show_front" class="">
          <button @click="updateFlashcard(0)" class="m-1 btn btn-warning">Again</button>
          <button @click="updateFlashcard(1)" class="m-1 btn btn-info">Okay</button>
          <button @click="updateFlashcard(2)" class="m-1 btn btn-success">Easy</button>
          <button @click="deleteFlashcard()" class="m-1 btn btn-error">Delete</button>
        </div>
      </div>
    </div>
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
