<template>
  <div class="pt-4 px-4">
    <div class="relative">
      <textarea
        class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3
        pr-10 focus:outline-none focus:ring-2 focus:ring-gray-700
        focus:ring-offset-2 focus:ring-offset-gray-100"
        placeholder="Hallo! Wie Geht's?"
        v-model="userMessage"
        :loading="response_loading"
        :resize="false"
        autofocus="true"
        @keyup.enter="handleConversationInput"
        >
      </textarea>

      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>

    <div class="buttons-container">
      <div class="mic-container">
        <va-icon name="mic" size="2rem" @click="toggleStartAndStop"/>
          <span v-if="isRecording">
            <svg height="80" width="80" class="blinking">
              <circle cx="50" cy="50" r="10" fill="red" />
              Sorry, your browser does not support inline SVG.
            </svg>
          </span>
      </div>
      <va-button @click="handleConversationInput">
        Send
      </va-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getConversation, converse, converseWithAudio } from "@/utils/api"

import ConversationLine from "@/components/ConversationLine.vue"
import TranslationPopup from "@/components/TranslationPopup.vue"
import ConversationPrompts from "@/components/ConversationPrompts.vue"
import ConversationInputs from "@/components/ConversationInputs.vue"

import { ref, computed } from "vue";
// @ts-ignore
import { useRecorder } from "vue-voice-recording";

const {
  isRecording,
  toggleStartAndStop,
} = useRecorder({
  // @ts-ignore
  getAsMp3: (value) => handleAudioInput(value),
});

const conversation = ref([]);
const userMessage = ref("");
const conversation_id = ref("new");
const response_loading = ref(false);

function handleConversationInput(event: any) {
  // shift + enter is common for new line.
  if (event.shiftKey) {
    return;
  }

  response_loading.value = true;

  const messageCopy = userMessage.value.slice();
  userMessage.value = "";

  // @ts-ignore
  conversation.value.push({
    role: "user",
    message: messageCopy
  });


  // @ts-ignore
  converse(conversation_id.value, messageCopy)
    .then(response => {
      conversation_id.value = response.data.conversation_id
      // @ts-ignore
      conversation.value[conversation.value.length - 1]["learning_moments"] = response.data.learning_moments.learning_moments

      // @ts-ignore
      conversation.value.push({
        role: "system",
        message: response.data.conversation_response,
      });
    })
    .finally(() => {
      response_loading.value = false
    });
}

// @ts-ignore
function handleAudioInput(audioInput) {
  response_loading.value = true;

  converseWithAudio(conversation_id.value, audioInput.data)
    .then(response => {
      conversation_id.value = response.data.conversation_id

      // @ts-ignore
      conversation.value.push({
        role: "user",
        message: response.data.input_message,
      });

      // @ts-ignore
      conversation.value[conversation.value.length - 1]["learning_moments"] = response.data.learning_moments.learning_moments

      // @ts-ignore
      conversation.value.push({
        role: "system",
        message: response.data.conversation_response,
      });
    })
    .finally(() => {
      response_loading.value = false
    });
}

function startConversationWithPrompt(prompt: object) {
  // @ts-ignore
  userMessage.value = prompt.message;
  handleConversationInput({});
};
</script>
