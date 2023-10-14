<template>
  <div
    class="bg-background-200 px-4 py-3 rounded-xl"
    ref="floating"
    :style="floatingStyles"
    >
    <div class="text-l font-bold mb-2">
      Translation ({{ fromLanguage }} -> {{ toLanguage }})
    </div>

    <div class="prose mb-3">
      {{ translatedSelection }}
    </div>
    <div class="w-full text-center">
      <button class="btn btn-accent" @click="createFlashcardClickHandler">
        Create Flashcard
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from "vue";

import { useFloating } from "@floating-ui/vue";
import { autoPlacement } from "@floating-ui/dom";

import { detect, detectAll } from 'tinyld/heavy';
import translate from "translate";
import { createFlashcard } from "@/utils/api"

const props = defineProps({
  conversationID: String,
  selectedText: Object,
})


// @ts-ignore
const virtualEl = ref({});
const floating = ref(null);
const { floatingStyles } = useFloating(
  // @ts-ignore
  virtualEl,
  floating,
  {
    middleware: [autoPlacement()],
  }
);

const emit = defineEmits(["completed"]);


// @ts-ignore
translate.engine = "deepl";
// @ts-ignore
translate.key = import.meta.env.VITE_DEEPL_API_KEY;

const translatedSelection = ref("translatedSelection");
const fromLanguage = ref("fromLanguage");
const toLanguage = ref("toLanguage");

watchEffect(() => {
  // @ts-ignore
  if (props.selectedText != "") {
    virtualEl.value = {
      getBoundingClientRect() {
        // @ts-ignore
        return props.selectedText.rects.value[0];
      },
      // @ts-ignore
      contextElement: props.selectedText.selection.value.anchorNode,
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
    // @ts-ignore
    props.selectedText.text.value,
    translatedSelection.value,
    true
  ).then(_ => {
    emit("completed");
  });
}
</script>
