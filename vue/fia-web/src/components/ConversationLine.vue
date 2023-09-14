<template>
  <div class="conversation-line">
    {{ this.updated_item }}
    {{ hasLearningMoments }}
    <div
      v-if='updated_item.role=="user"'
      class="user-flex-container"
      >
      <div class="message user-message">
        <va-card
          color="primary"
          gradient
          >
          <va-card-title>You:</va-card-title>
          <va-card-content>
            {{ updated_item.message }}
          </va-card-content>
        </va-card>
      </div>
      <div v-if="hasLearningMoments" class="message learning-message">
        <va-card
          v-for="(moment, index) in updated_item.learning_moments"
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
            {{ updated_item.message }}
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
  data() {
    return {
      updated_item: this.item
    }
  },
  computed: {
    hasLearningMoments: function() {
      if (Object.hasOwn(this.updated_item, "learning_moments") &&
        this.updated_item.learning_moments) {
        return true;
      }

      return false;
    },
  },
  watch: {
    item: function(newVal, oldVal) {
      this.update_item = newVal;
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
