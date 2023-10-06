<template>
  <div class="flex pt-4 justify-center">
    <Flashcard
      v-if="flashcards.length > 0"
      :item="flashcards[0]"
      @completed="markFlashcardAsComplete"
      />
    <div v-else class="">
      Done for now! Check back later for more flashcards to review.
    </div>
  </div>
</template>

<script lang="ts">
import { getFlashcards } from "@/utils/api"
import { useAuthStore } from "@/stores/authStore"
import Flashcard from "@/components/Flashcard.vue"

const authStore = useAuthStore()


export default {
  name: 'ReviewFlashcards',
  components: {
    Flashcard,
  },
  data() {
    return {
      "flashcards": [],
    }
  },
  created() {
    getFlashcards()
      .then(response => {
        this.flashcards = response["data"]["flashcards"];
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    markFlashcardAsComplete() {
      this.flashcards.shift();
    }
  }
}
</script>
