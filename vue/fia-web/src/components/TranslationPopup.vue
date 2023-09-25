<template>
  <div>
    TRANSLATION: {{ translatedSelection }}
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

import { useTextSelection } from '@vueuse/core';
import translate from "translate";

const props = defineProps({
  selectedText: String,
  conversationID: Number,
})

console.log("HERE");
console.log(props.selectedText);

// @ts-ignore
translate.engine = "deepl";
// @ts-ignore
translate.key = import.meta.env.VITE_DEEPL_API_KEY;

const translatedSelection = ref("");

watch(props, async () => {
  console.log("Running watcher...");
  console.log("selectedText is " + props.selectedText);

  if (props.selectedText != "") {
    translate(props.selectedText, "de").then((value) => {
      console.log(value);
      translatedSelection.value = value;
    });
  } else {
    translatedSelection.value = "";
  }
})

const selectedText = useTextSelection()
</script>

<style scoped>
</style>
