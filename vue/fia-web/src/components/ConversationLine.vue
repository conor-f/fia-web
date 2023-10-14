<template>
  <div class="conversation-line">
    <div v-if='item.role=="user"'>
      <div class="chat chat-start">
        <div class="chat-bubble chat-bubble-primary">
          {{ item.message }}
        </div>
      </div>

      <div v-if="hasLearningMoments" class="chat chat-end">
        <div
          v-for="(moment, index) in item.learning_moments"
          :key="index"
          class="chat-bubble chat-bubble-warning mb-1"
          >

          <!-- @vue-ignore -->
          <div v-if="Object.hasOwn(moment.moment, 'incorrect_section')">
            <div class="text-center">
              <span class="text-error"> {{ moment.moment.incorrect_section }} </span>
              ->
              <span class="text-success"> {{ moment.moment.corrected_section }} </span>
            </div>
            Explanation: {{ moment.moment.explanation }}
          </div>

          <div v-else>
            <div class="text-center">
              <span class="text-error"> {{ moment.moment.phrase }} </span>
              ->
              <span class="text-success"> {{ moment.moment.translated_phrase }} </span>
            </div>
            Explanation: {{ moment.moment.explanation }}
          </div>
        </div>
      </div>
    </div>

    <div v-else class="chat chat-end">
      <div class="chat-bubble chat-bubble-secondary">
        {{ item.message }}
        <PlayIcon
          class="h-6 w-6 inline
          stroke-1 text-black-500
          hover:stroke-2 hover:text-black-700"
          @click="playAudio(item.message)"
          />  
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed } from "vue";

import { getAudio } from "@/utils/api"
import { useUserDetailsStore } from "@/stores/userDetailsStore"

import PlayIcon from "@/assets/icons/PlayIcon.vue"

const userDetailsStore = useUserDetailsStore()

const props = defineProps({
  item: Object,
});

const hasLearningMoments = computed(() => {
  // @ts-ignore
  if ("learning_moments" in props.item &&
    props.item.learning_moments) {
    return true;
  }

  return false;
})

// TODO: Don't allow audio to play if already playing
function playAudio(message: string) {
  getAudio(message, userDetailsStore.languageCode).then(async (response) => {
    const data = await response.arrayBuffer();
    const context = new AudioContext();
    const buffer = await context.decodeAudioData(data);
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
  });
}
</script>
