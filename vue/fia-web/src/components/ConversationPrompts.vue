<template>
  <div class="flex flex-col px-4">
    <div class="text-xl">
      Start a conversation by clicking the prompts below, or type/speak a
      message in the chat box
    </div>

    <div class="pt-5 grid gap-4 grid-flow-row md:grid-cols-2 md:auto-rows-max">
      <ConversationPrompt
        v-for="prompt_object in conversationPrompts"
        :key="(prompt_object as any)"
        :title="(prompt_object.title as any)"
        :prompt="(prompt_object.prompt as any)"
        @click="startConversationWithPrompt(prompt_object)"
        />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

import ConversationPrompt from "@/components/ConversationPrompt.vue"


const conversationPrompts = ref([
  {
    "title": "Game",
    "prompt": "Können wir zwanzig Fragen spielen?",
  },
  {
    "title": "Sport",
    "prompt": "Ich glaube, dass Irland die Rugby-Weltmeisterschaft gewinnen wird",
  },
  {
    "title": "Pop Culture",
    "prompt": "Glaubst du, Taylor Swift hat einen Bauchnabel?",
  },
  {
    "title": "Help!",
    "prompt": "Kannst du mir beibringen, wie man Kaffee in einer Moka-Kanne kocht?",
  },
]);

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

function startConversationWithPrompt(prompt_object: object) {
  // @ts-ignore
  userMessage.value = prompt_object.prompt;
  handleConversationInput({});
};
</script>
