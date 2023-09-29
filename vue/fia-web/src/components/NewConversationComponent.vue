<template>
  <div class="conversation">
    <div v-if="! isActiveConversation">
      <div class="opening-message">
        Welcome! Feel free to start a new conversation using the inputs below. If
        you're stuck for ideas, why not try one of the prompts?
      </div>

      <div class="prompt-container">
        <va-card
          class="conversation-prompt"
          color="gray"
          gradient
          v-for="prompt in conversationPrompts"
          :key="prompt"
          :prompt="prompt"
          @click="startConversationWithPrompt(prompt)"
          >
          <va-card-title> {{ prompt.title }} </va-card-title>
          <va-card-content>
            {{ prompt.message }}
          </va-card-content>
        </va-card>
      </div>

    </div>
    <div v-else>
      <ConversationLine
        v-for="conversationLine in conversation"
        :item="conversationLine"
        :key="conversationLine"
        />
    </div>

    <va-inner-loading :loading="response_loading">
      <textarea
        cols=40
        rows=3
        v-model="userMessage"
        class="mt-5"
        autofocus="true"
        @keyup.enter="handleConversationInput"
      />
      <span>
        <va-icon name="mic" size="2rem" @click="toggleStartAndStop"/>

        <span v-if="isRecording">
          <svg height="80" width="80" class="blinking">
            <circle cx="50" cy="50" r="10" fill="red" />
            Sorry, your browser does not support inline SVG.
          </svg>
        </span>
      </span>
      <input
        type="button"
        @click="handleConversationInput"
        value="Send"
      />
    </va-inner-loading>
  </div>

  <TranslationPopup
    v-if="shouldShowTranslation"
    :selected-text="selectedText.text.value"
    :conversation-ID="conversation_id"
    >
  </TranslationPopup>
</template>

<script lang="ts" setup>
import { getConversation, converse, converseWithAudio } from "@/utils/api"

import ConversationLine from "@/components/ConversationLine.vue"
import TranslationPopup from "@/components/TranslationPopup.vue"

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
  return selectedText.text.value != "";
})

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

function startConversationWithPrompt(prompt) {
  console.log(prompt.message);
  userMessage.value = prompt.message;
  handleConversationInput({});
};
</script>

<style scoped>
textarea {
  resize: none;
}

/* BEGIN Record animation */
.blinking {
  -webkit-animation: 1s blink ease infinite;
  -moz-animation: 1s blink ease infinite;
  -ms-animation: 1s blink ease infinite;
  -o-animation: 1s blink ease infinite;
  animation: 1s blink ease infinite;
}

@keyframes "blink" {
  from, to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@-moz-keyframes blink {
  from, to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@-webkit-keyframes "blink" {
  from, to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@-ms-keyframes "blink" {
  from, to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@-o-keyframes "blink" {
  from, to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
/* END Record animation */

.prompt-container {
  padding: .5rem;
  width: 75%;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, auto);
}

.conversation-prompt {
  display: inline-block;
  padding: .25rem;
  border-radius: .75rem;
}
</style>
