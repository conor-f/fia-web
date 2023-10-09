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

      <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <!-- TODO: Hover states -->
        <div @click="toggleStartAndStop" class="mr-2">
          <MicrophoneIcon v-if="!isRecording"/>
          <RecordingIcon v-if="isRecording" class="mb-3"/>
        </div>
        <MessageSendIcon @click="handleConversationInput"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getConversation, converse, converseWithAudio } from "@/utils/api"

import ConversationLine from "@/components/ConversationLine.vue"
import TranslationPopup from "@/components/TranslationPopup.vue"
import ConversationPrompts from "@/components/ConversationPrompts.vue"
import ConversationInputs from "@/components/ConversationInputs.vue"

import MessageSendIcon from "@/assets/icons/MessageSendIcon.vue"
import MicrophoneIcon from "@/assets/icons/MicrophoneIcon.vue"
import RecordingIcon from "@/assets/icons/RecordingIcon.vue"

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
