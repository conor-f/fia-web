<template>
    <h3 class="mt-3" >
      Review Flashcards
    </h3>

    <div
      v-for="(flashcard, index) in flashcards"
      :key="index"
      >
      <Flashcard :item="flashcard" />
    </div>
</template>

<script lang="ts">
import { getFlashcards } from "@/utils/api"
import { toast } from "vue-sonner"
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
  }
}
</script>

<style>
</style>
