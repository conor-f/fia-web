<template>
  <div
    class="bg-background-200 px-4 py-3"
    ref="floating"
    :style="floatingStyles"
    >
    <div class="text-l font-bold mb-2">
      Translation ({{ fromLanguage }} -> {{ toLanguage }})
    </div>

    <div class="prose">
      {{ translatedSelection }}
    </div>
    <div>
      <button @click="createFlashcardClickHandler">
        Create Flashcard
      </button>
    </div>
  </div>
  <!--
  <div class="translation-popup-container">
    <div>
    </div>
  </div>
  -->
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from "vue";

import { useFloating } from "@floating-ui/vue";

import { detect, detectAll } from 'tinyld/heavy';
import translate from "translate";
import { createFlashcard } from "@/utils/api"

const props = defineProps({
  conversationID: String,
  selectedText: String,
  xPosition: Number,
  yPosition: Number,
})


const virtualEl = ref({
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});
const floating = ref(null);
const { floatingStyles } = useFloating(virtualEl, floating);

const emit = defineEmits(["completed"]);


// @ts-ignore
translate.engine = "deepl";
// @ts-ignore
translate.key = import.meta.env.VITE_DEEPL_API_KEY;

const translatedSelection = ref("translatedSelection");
const fromLanguage = ref("fromLanguage");
const toLanguage = ref("toLanguage");

watchEffect(() => {
  if (props.selectedText != "") {
    virtualEl.value = {
      getBoundingClientRect() {
        return props.selectedText.rects.value[0];
      }
    }

    let inputLang = "de";
    let outputLang = "en";

    // TODO: Support more robust language switching:
    // @ts-ignore
    for (let langConfidence of detectAll(props.selectedText.text.value)) {
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
    translate(props.selectedText.text.value, {
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
