<template>
  <div class="translation-popup-container">
    <va-card>
      <va-card-title>
        Translation ({{ fromLanguage }} -> {{ toLanguage }})
      </va-card-title>
      <va-card-content>
        {{ translatedSelection }}
      </va-card-content>
      <va-card-actions>
        <va-button @click="createFlashcardClickHandler">
          Create Flashcard
        </va-button>
      </va-card-actions>
    </va-card>
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
  xPosition: Number,
  yPosition: Number,
})

const emit = defineEmits(["completed"]);

const xPosition = computed(() => {
    return props.xPosition + "px";
})
const yPosition = computed(() => {
    return props.yPosition + "px";
})

// @ts-ignore
translate.engine = "deepl";
// @ts-ignore
translate.key = import.meta.env.VITE_DEEPL_API_KEY;

const translatedSelection = ref("translatedSelection");
const fromLanguage = ref("fromLanguage");
const toLanguage = ref("toLanguage");

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

    fromLanguage.value = inputLang;
    toLanguage.value = outputLang;

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
  ).then(_ => {
    emit("completed");
  });
}
</script>

<style scoped>
.translation-popup-container {
  position: fixed;
  top: v-bind("yPosition");
  left: v-bind("xPosition");
}
</style>
