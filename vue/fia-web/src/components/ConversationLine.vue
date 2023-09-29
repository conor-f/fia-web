<template>
  <div class="conversation-line">
    <div
      v-if='item.role=="user"'
      class="user-flex-container"
      >
      <div class="message user-message">
        <va-card
          color="#2FE0B3"
          gradient
          >
          <va-card-title>You:</va-card-title>
          <va-card-content>
            {{ item.message }}
          </va-card-content>
        </va-card>
      </div>
      <div v-if="hasLearningMoments" class="message learning-message">
        <va-card
          v-for="(moment, index) in item.learning_moments"
          :key="index"
          class="learning-moment-container"
          >
          <va-card-content>
            <span class="incorrect-text"> {{ moment.moment.incorrect_section }} </span> ->
            <span class="correct-text"> {{ moment.moment.corrected_section }} </span>
            <br/>
            <br/>
            Explanation: {{ moment.moment.explanation }}
          </va-card-content>
        </va-card>
      </div>
    </div>

    <div
      v-else
      class="system-flex-container"
      >
      <div class="message system-message">
        <va-card
          color="#db8374"
          gradient
          >
          <va-card-title>System:</va-card-title>
          <va-card-content>
            {{ item.message }}
            <va-icon
              name="play_arrow"
              size="1rem"
              @click="playAudio(item.message)"
              />
          </va-card-content>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAudio } from "@/utils/api"

export default {
  name: 'ConversationLine',
  props: [
    "item"
  ],
  computed: {
    hasLearningMoments: function() {
      // @ts-ignore
      if (Object.hasOwn(this.item, "learning_moments") &&
        this.item.learning_moments) {
        return true;
      }

      return false;
    },
  },
  methods: {
    playAudio(message: string) {
      getAudio(message).then(async (response) => {
        const data = await response.arrayBuffer();
        console.log(data)
        const context = new AudioContext();
        const buffer = await context.decodeAudioData(data);
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0);
      });
    }
  }
}
</script>

<style scoped>
.user-flex-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.message {
  width: 40%;
  margin: 1em;
}

.learning-moment-container {
  border: 1px solid black;
  margin-top: 0.5rem;
  border-radius: 1rem;
}

.learning-message {
  margin-top: 2em;
}

.system-flex-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
}

.incorrect-text {
  color: var(--va-danger);
}

.correct-text {
  color: var(--va-success);
}
</style>
