<template>
  <div class="flex pt-4 justify-center">
    <Flashcard
      v-if="flashcards.length > 0"
      :item="flashcards[0]"
      @completed="markFlashcardAsComplete"
      />
    <div v-if="isLoading">
      Checking for new flashcards to review...
    </div>
    <div v-else class="">
      Done for now! Check back later for more flashcards to review.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { getFlashcards } from "@/utils/api"
import Flashcard from "@/components/Flashcard.vue"

const isLoading = ref(true);
const flashcards = ref([]);

onMounted(() => {
  getFlashcards()
    .then(response => {
      this.flashcards = response["data"]["flashcards"];
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      isLoading.value = false;
    });
})

function markFlashcardAsComplete() {
  flashcards.value.shift();
}
</script>
