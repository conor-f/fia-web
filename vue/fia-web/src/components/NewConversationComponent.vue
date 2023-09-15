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

<script lang="ts">
import { getConversation, converse, converseWithAudio } from "@/utils/api"
import { VueVoiceRecording } from "vue-voice-recording";
import 'vue-voice-recording/dist/style.css';
import { toast } from "vue-sonner"

import ConversationLine from "@/components/ConversationLine.vue"

import { ref, onMounted } from "vue";
import { useRecorder} from "vue-voice-recording";

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


export default {
  name: 'NewConversationComponent',
  components: {
    ConversationLine,
    VueVoiceRecording,
  },
  data: function() {
    return {
      conversation: [],
      userMessage: "",
      conversation_id: "new",
      response_loading: false,
    }
  },
  computed: {
    isActiveConversation: function() {
      return this.conversation_id != "new";
    },
  },
  methods: {
    handleConversationInput() {
      this.response_loading = true;

      const messageCopy = this.userMessage.slice();
      this.userMessage = "";

      // @ts-ignore
      this.conversation.push({
        role: "user",
        message: messageCopy
      });


      converse(this.conversation_id, messageCopy)
        .then(response => {
          this.conversation_id = response.data.conversation_id
          // @ts-ignore
          this.conversation[this.conversation.length - 1]["learning_moments"] = response.data.learning_moments.learning_moments

          // @ts-ignore
          this.conversation.push({
            role: "system",
            message: response.data.conversation_response,
          });

          this.response_loading = false;
        });
    },
    handlAudioInput(audioInput) {
      this.response_loading = true;

      converseWithAudio(this.conversation_id, audioInput.data)
        .then(response => {
          this.conversation_id = response.data.conversation_id

          // @ts-ignore
          this.conversation.push({
            role: "user",
            message: response.data.input_message,
          });

          // @ts-ignore
          this.conversation[this.conversation.length - 1]["learning_moments"] = response.data.learning_moments.learning_moments

          // @ts-ignore
          this.conversation.push({
            role: "system",
            message: response.data.conversation_response,
          });

          this.response_loading = false;
        });
    },
  },
}
</script>

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
