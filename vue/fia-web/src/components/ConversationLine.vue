<template>
  <div class="conversation-line">
    <div v-if='item.role=="user"'>
      <b>{{ item.role }}: </b> {{ item.message }}
    </div>

    <div v-else>
      <div>
        <br/>
        <div
          v-for="(learningMoment, index) in item.learningMoments.learning_moments"
          :key="index">
          <span style="color:red"> {{ learningMoment.moment.incorrect_section }} </span> -> <span style="color:green"> {{ learningMoment.moment.corrected_section }} </span>
          <br/>
          Explanation: {{ learningMoment.moment.explanation }}
          <br/>
          <br/>
        </div>
      </div>
      <b>{{ item.role }}: </b> {{ item.message }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ConversationLine',
  props: [
    "item"
  ],
}
</script>

<style scoped>
</style>
