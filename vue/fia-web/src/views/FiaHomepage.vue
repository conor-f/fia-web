<template>
  <!--
    TODO:
      - Have row text alternate left/right
    -->
  <div class="flex flex-col min-h-screen
  bg-gradient-to-br from-red-500 to-orange-500">
    <div class="flex flex-row justify-between">
      <h1 class="flex-1 basis-2/4 text-4xl font-bold">
        Fia gets you speaking and understanding a new language from day one.
      </h1>

      <div class="flex-initial basis-1/4"></div>

      <!-- With this visible, there's padding on the right on small screens...  -->
      <Logo
        class="hidden flex-initial basis-1/4 p-12 rounded-lg max-h-96 align-middle shadow-2xl"
        />
    </div>

    <div
      class="flex flex-row basis-2/4"
      >
      Fia is an AI-powered language learning tool.
      You type (or speak!) to have a conversation at your own level.
      Fia shows you your mistakes, and explains the corrected sentence.
      All of your mistakes are stored as flashcards, allowing you to review and improve every day.
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/icons/Logo.vue'
</script>
