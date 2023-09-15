<script lang="ts">
import { getConversation, converse, converseWithAudio } from "@/utils/api"
import VueVoiceRecording from "vue-voice-recording";
import 'vue-voice-recording/dist/style.css';
import { toast } from "vue-sonner"

import ConversationLine from "@/components/ConversationLine.vue"

import { ref, computed, onMounted } from "vue";
import { useRecorder } from "vue-voice-recording";

const {
  isRecording,
  toggleStartAndStop,
} = useRecorder({
  afterStartRecording: () => console.log("a"),
  afterStopRecording: (blob) => console.log("b"),
  afterPauseRecording: () => console.log("c"),
  afterResumeRecording: () => console.log("d"),
  getAsMp3: (value) => console.log("e"),
});


const conversation = ref([]);
const userMessage = ref("");
const conversation_id = ref("new");
const response_loading = ref(false);

const isActiveConversation = computed(() => {
    return conversation_id.value != "new";
})

function handleConversationInput() {
  response_loading.value = true;

  const messageCopy = userMessage.value.slice();
  userMessage.value = "";

  // @ts-ignore
  this.conversation.value.push({
    role: "user",
    message: messageCopy
  });


  converse(conversation_id, messageCopy)
    .then(response => {
      conversation_id.value = response.data.conversation_id
      // @ts-ignore
      conversation.value[conversation.value.length - 1]["learning_moments"] = response.data.learning_moments.learning_moments

      // @ts-ignore
      conversation.value.push({
        role: "system",
        message: response.data.conversation_response,
      });

      response_loading.value = false;
    });
}


function handlAudioInput(audioInput) {
  response_loading.value = true;

  converseWithAudio(conversation_id, audioInput.data)
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

      response_loading.value = false;
    });
}
</script>

<template>
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
        cols=60
        rows=3
        v-model="userMessage"
        class="mt-5"
        autofocus="true"
        @keyup.enter="handleConversationInput"
      />
      <input
        type="button"
        @click="handleConversationInput"
        value="Send"
      />
      <VueVoiceRecording @getAsMp3="gotMP3"></VueVoiceRecording>
    </va-inner-loading>
  </div>
  <slot
      :isRecording="isRecording"
      :isPaused="isPaused"
      :recordingTime="recordingTime"
      :recordingState="recordingState"
      :toggleStartAndStop="toggleStartAndStop"
      :togglePauseAndResume="togglePauseAndResume"
      :startRecording="startRecording"
      :stopRecording="stopRecording"
      :pauseRecording="pauseRecording"
      :resumeRecording="resumeRecording"
  >
    <span v-if="isRecording">Rec</span>
    <span v-else>Not</span>
  </slot>
</template>

<style scoped>
textarea {
  resize: none;
}

.voice-recorder {
  height: 100px;
  width: 100px;
  margin: auto auto;
}
</style>
