<template>
  <div 
    class="conversation"
    @mousedown="setCoords"
    >

    <ConversationPrompts v-if="! isActiveConversation"/>

    <div v-else>
      <ConversationLine
        v-for="conversationLine in conversation"
        :item="conversationLine"
        :key="conversationLine"
        />
    </div>

    <div class="inputs-container">
      <va-textarea
        :minRows="3"
        v-model="userMessage"
        :loading="response_loading"
        :resize="false"
        class="inputBox"
        autofocus="true"
        @keyup.enter="handleConversationInput"
      >
      </va-textarea>

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
  </div>

  <TranslationPopup
    v-if="shouldShowTranslation"
    :selected-text="selectedText.text.value"
    :xPosition="xCursorPosition"
    :yPosition="yCursorPosition"
    :conversation-ID="conversation_id"
    @completed="completeTranslation"
    >
  </TranslationPopup>
</template>

<script lang="ts" setup>
import { getConversation, converse, converseWithAudio } from "@/utils/api"

import ConversationLine from "@/components/ConversationLine.vue"
import TranslationPopup from "@/components/TranslationPopup.vue"
import ConversationPrompts from "@/components/ConversationPrompts.vue"

import { ref, computed } from "vue";
// @ts-ignore
import { useRecorder } from "vue-voice-recording";

import { useTextSelection } from '@vueuse/core';

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
const selectedText = useTextSelection()
const xCursorPosition = ref(0)
const yCursorPosition = ref(0)

const conversationPrompts = ref([
  {
    "title": "Game",
    "message": "Können wir zwanzig Fragen spielen?",
  },
  {
    "title": "Sport",
    "message": "Ich glaube, dass Irland die Rugby-Weltmeisterschaft gewinnen wird",
  },
  {
    "title": "Pop Culture",
    "message": "Glaubst du, Taylor Swift hat einen Bauchnabel?",
  },
  {
    "title": "Help!",
    "message": "Kannst du mir beibringen, wie man Kaffee in einer Moka-Kanne kocht?",
  },
]);

const isActiveConversation = computed(() => {
    return conversation_id.value != "new";
})

const shouldShowTranslation = computed(() => {
  return isActiveConversation.value && selectedText.text.value != "";
})

function completeTranslation() {
  // @ts-ignore
  window.getSelection().removeAllRanges();
}

// @ts-ignore
function setCoords(event) {
  xCursorPosition.value = event.clientX;
  yCursorPosition.value = event.clientY;
}

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
