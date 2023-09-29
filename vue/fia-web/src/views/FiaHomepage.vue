<template>
  <!--
    TODO:
      - Have row text alternate left/right
    -->
  <main class="content-container">
    <span class="row impact">
      Fia gets you speaking and understanding a new language from day one.
    </span>

    <span class="row secondary">
      Fia is an AI-powered language learning tool.
    </span>

    <span class="row secondary">
      You type (or speak!) to have a conversation at your own level.
    </span>

    <span class="row secondary">
      Fia shows you your mistakes, and explains the corrected sentence.
    </span>

    <span class="row secondary">
      All of your mistakes are stored as flashcards, allowing you to review and improve every day.
    </span>
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped>
.content-container {
  background-image: linear-gradient(to right bottom, #d44730, #ca4036, #be3a3a, #b2363e, #a63240, #a63040, #a62d40, #a62b40, #b3283f, #bf263c, #cb223a, #d71f36);
  width: 100%;
  color: var(--va-text-inverted);
  display: flex;
  flex-flow: column;
}

.content-container .row {
  flex: 0 1 auto;
  padding-top: 2em;
  padding-left: 2em;
  width: 50%;
  /* The above is shorthand for:
  flex-grow: 0,
  flex-shrink: 1,
  flex-basis: auto
  */
}

.impact {
  font-weight: bolder;
  font-size: 250%;
  line-height: 120%;
  padding-bottom: 2em;
}

.secondary {
  font-weight: normal;
  font-size: 120%;
  line-height: 120%;
}
</style>
