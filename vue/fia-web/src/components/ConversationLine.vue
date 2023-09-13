<template>
  <div class="conversation-line">
    <div
      v-if='item.role=="user"'
      class="user-flex-container"
      >
      <div class="message user-message">
        <va-card
          color="primary"
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
          color="warning"
          gradient
          >
          <va-card-content>
            <span style="color:red"> {{ moment.moment.incorrect_section }} </span> ->
            <span style="color:green"> {{ moment.moment.corrected_section }} </span>
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
          color="secondary"
          gradient
          >
          <va-card-title>System:</va-card-title>
          <va-card-content>
            {{ item.message }}
          </va-card-content>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ConversationLine',
  props: [
    "item"
  ],
  computed: {
    hasLearningMoments: function() {
      if (Object.hasOwn(this.item, "learning_moments") &&
        this.item.learning_moments) {
        return true;
      }

      return false;
    },
  },
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

.learning-message {
  margin-top: 2em;
}

.system-flex-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
}
</style>
