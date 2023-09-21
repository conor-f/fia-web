<template>
  {{ translatedSelection }}

  <div class="conversation">
    <div v-if="! isActiveConversation">
      Welcome! Start a new conversation :)
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
</template>

<script lang="ts" setup>
import { getConversation, converse, converseWithAudio } from "@/utils/api"
import { toast } from "vue-sonner"

import ConversationLine from "@/components/ConversationLine.vue"

import { ref, computed, onMounted } from "vue";
// @ts-ignore
import { useRecorder } from "vue-voice-recording";

import { useTextSelection } from '@vueuse/core';
import translate from "translate";
translate.engine = "deepl";
translate.key = import.meta.env.VITE_DEEPL_API_KEY;

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
const translatedSelection = ref("");

const isActiveConversation = computed(() => {
    return conversation_id.value != "new";
})

window.addEventListener("mouseup", function() {
  if (selectedText.text.value != "") {
    translate(selectedText.text.value, "de").then((value) => {
      translatedSelection.value = value;
    });
  } else {
    translatedSelection.value = "";
  }
})

const selectedText = useTextSelection()

function handleConversationInput(event) {
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
</style>
