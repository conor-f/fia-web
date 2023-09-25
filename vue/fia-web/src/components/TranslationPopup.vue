<template>
  <div>
    TRANSLATION: {{ translatedSelection }}
    <va-button @click="createFlashcardClickHandler">
      Create Flashcard
    </va-button>

  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from "vue";

import { useTextSelection } from '@vueuse/core';
import { detect, detectAll } from 'tinyld/heavy';
import translate from "translate";
import { createFlashcard } from "@/utils/api"

const props = defineProps({
  conversationID: String,
  selectedText: String,
})


// @ts-ignore
translate.engine = "deepl";
// @ts-ignore
translate.key = import.meta.env.VITE_DEEPL_API_KEY;

const translatedSelection = ref("");

watchEffect(() => {
  if (props.selectedText != "") {
    let inputLang = "de";
    let outputLang = "en";

    // TODO: Support more robust language switching:
    // @ts-ignore
    for (let langConfidence of detectAll(props.selectedText)) {
      if (langConfidence.lang == "en") {
        inputLang = "en";
        outputLang = "de";
        break;
      } else if (langConfidence.lang == "de") {
        inputLang = "de";
        outputLang = "en";
        break;
      }
    }

    // @ts-ignore
    translate(props.selectedText, {
      from: inputLang,
      to: outputLang,
    }).then((value) => {
      translatedSelection.value = value;
    });
  } else {
    translatedSelection.value = "";
  }
})

function createFlashcardClickHandler() {
  createFlashcard(
    // @ts-ignore
    props.conversationID,
    props.selectedText,
    translatedSelection.value,
    true
  )
}
</script>

<style scoped>
</style>
