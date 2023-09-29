<template>
  <div class="about-container">
    <div class="about-row">
      Fia is a language learning platform that allows you to learn through conversation from day one.
    </div>

    <div class="about-row">
      Using custom trained AI models, Fia analyzes your messages to search for grammar mistakes you may have made. When Fia spots one, it corrects you, and creates a flashcard for you to review to help you gain fluency.
    </div>

    <div class="about-row">
      Fia decides which flashcards you need to review using a Spaced-Repetition Algorithm. This optimizes your time and effort by only asking you to review information just before your brain forgets it.
    </div>

    <div class="about-row">
      Fia is designed for you. Each conversation is tailored to your language fluency, allowing you to have conversations at a level optimized for learning.
    </div>

    <div class="about-row">
      As you gain confidence and ability in your new language, Fia will show you how far you’ve progressed.
    </div>

    <div class="about-row">
      Fia is designed with privacy at the forefront. For this reason, Fia is open-source and self-hostable. If you have any privacy concerns, don’t take our word for it! You (or a friend!) can review the code to ensure everything is above board.
    </div>

    <div class="about-row">
      More questions? Feel free to get in touch at hello@getfia.com
    </div>
  </div>
</template>

<style>
.about-container {
  background-image: linear-gradient(to right bottom, #d44730, #ca4036, #be3a3a, #b2363e, #a63240, #a63040, #a62d40, #a62b40, #b3283f, #bf263c, #cb223a, #d71f36);
  width: 100%;
  color: var(--va-text-inverted);
  display: flex;
  flex-flow: column;
}

.about-container .about-row {
  flex: 0 1 auto;
  padding-top: 2em;
  padding-left: 2em;
  width: 80%;
  margin: 0 auto;
  font-weight: normal;
  font-size: 120%;
  line-height: 120%;
}
</style>
