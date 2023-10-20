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
        @click="handlePromptClick(prompt_object)"
        />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

import ConversationPrompt from "@/components/ConversationPrompt.vue"
import prompts from "@/utils/prompts.ts";
import { useUserDetailsStore } from "@/stores/userDetailsStore"
const userDetailsStore = useUserDetailsStore()

const emit = defineEmits(["promptClicked"]);

const conversationPrompts = computed(() => {
  return prompts[userDetailsStore.languageCode];
})

function handlePromptClick(prompt_object: object) {
  emit("promptClicked", prompt_object);
}
</script>
