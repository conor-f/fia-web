<template>
  <div class="my-5">

    <div v-if="!isActiveConversation">
      <ConversationPrompts
        @promptClicked="handlePromptClick"/>
    </div>

    <div v-else>
      <ConversationLine
        v-for="conversationLine in conversation"
        :item="conversationLine"
        :key="conversationLine"
        />
    </div>

    <ConversationInputs
      :isLoading="isLoading"
      @textMessageInput="handleTextMessageInput"
      @audioMessageInput="handleAudioMessageInput"
      />
  </div>

  <TranslationPopup
    v-if="shouldShowTranslation"
    :selected-text="selectedText"
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
import ConversationInputs from "@/components/ConversationInputs.vue"

import { ref, computed } from "vue";

import { useTextSelection } from '@vueuse/core';

const conversation = ref([]);
const conversation_id = ref("new");
const isLoading = ref(false);
const selectedText = useTextSelection()

const isActiveConversation = computed(() => {
  return conversation.value.length != 0;
})

const shouldShowTranslation = computed(() => {
  return isActiveConversation.value && selectedText.text.value != "";
})

function completeTranslation() {
  // @ts-ignore
  window.getSelection().removeAllRanges();
}

function converseWithMessage(message: string) {
  isLoading.value = true;

  // @ts-ignore
  converse(conversation_id.value, message)
    .then(response => {
      conversation_id.value = response.data.conversation_id
      // @ts-ignore
      conversation.value[conversation.value.length - 1]["learning_moments"] = response.data.learning_moments.learning_moments

      pushMessageToConversation("system", response.data.conversation_response);
    })
    .finally(() => {
      isLoading.value = false
    });
}

function pushMessageToConversation(role: string, message: string) {
  // @ts-ignore
  conversation.value.push({
    role: role,
    message: message
  });
}

// @ts-ignore
function handleAudioMessageInput(audioInput) {
  isLoading.value = true;

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
      isLoading.value = false
    });
}

function handlePromptClick(prompt_object: object) {
  // @ts-ignore
  pushMessageToConversation("user", prompt_object.prompt);
  // @ts-ignore
  converseWithMessage(prompt_object.prompt);
}

function handleTextMessageInput(message: string) {
  pushMessageToConversation("user", message);
  converseWithMessage(message);
}
</script>
