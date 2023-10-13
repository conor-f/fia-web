<template>
  <div class="pt-4 px-4">
    <div class="relative">
      <textarea
        class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3
        pr-10 focus:outline-none focus:ring-2 focus:ring-gray-700
        focus:ring-offset-2 focus:ring-offset-gray-100"
        placeholder="Hallo! Wie Geht's?"
        v-model="userMessage"
        :resize="false"
        autofocus="true"
        :disabled="isLoading"
        @keyup.enter="handleMessageInput"
        >
      </textarea>

      <div class="absolute inset-y-0 right-0 pr-1 flex items-center">
        <div v-if="isLoading">
          <span class="loading loading-spinner mr-2 loading-lg text-primary-600">
          </span>
        </div>
        <div v-else class="flex items-center mr-2">
          <MicrophoneIcon
            v-if="!isRecording"
            @click="toggleStartAndStop"
            class="mr-3 text-gray-700 hover:text-gray-900"
          />
          <RecordingIcon v-if="isRecording" @click="toggleStartAndStop" class="mb-3"/>
          <MessageSendIcon
            @click="handleMessageInput"
            class="text-gray-700 hover:text-gray-900"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MessageSendIcon from "@/assets/icons/MessageSendIcon.vue"
import MicrophoneIcon from "@/assets/icons/MicrophoneIcon.vue"
import RecordingIcon from "@/assets/icons/RecordingIcon.vue"

import { ref, computed } from "vue";
// @ts-ignore
import { useRecorder } from "vue-voice-recording";

const emit = defineEmits([
  "textMessageInput",
  "audioMessageInput"
]);

const props = defineProps({
  isLoading: Boolean,
});


const {
  isRecording,
  toggleStartAndStop,
} = useRecorder({
  // @ts-ignore
  getAsMp3: (value) => handleAudioInput(value),
});

const userMessage = ref("");

// @ts-ignore
function handleAudioInput(audioInput) {
  emit("audioMessageInput", audioInput);
}

function handleMessageInput(event: any) {
  // If someone hits the enter button/send button icon while recording.
  if (isRecording.value) {
    toggleStartAndStop();
    return;
  }

  // shift + enter is common for new line.
  if (event.shiftKey) {
    return;
  }

  const messageCopy = userMessage.value.slice();
  userMessage.value = "";

  emit("textMessageInput", messageCopy);
}
</script>
