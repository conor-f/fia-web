<template>
  <div
    class="
    w-full
    px-5 pt-7
    text-xl text-background-50 font-bold text-center"
    >
    Fia gets you speaking and understanding a new language from day one
  </div>

  <Logo
    class="
    w-full
    flex-initial basis-1/4 p-12 rounded-lg max-h-96 align-middle"
    />

  <div class="w-full px-5 text-l text-background-50">
  Fia is an AI-powered language learning tool that allows you to 
  have a conversation at your own level
  </div>

  <div class="w-full pt-5 px-5 text-l text-background-50">
  Fia shows you your mistakes, and explains them to you
  </div>

  <div class="w-full pt-5 px-5 text-l text-background-50">
  These mistakes are stored as flashcards, allowing you to review and improve every day
  </div>

  <div
    class="w-full px-5 pt-7 text-xl text-background-50 font-bold text-center"
  >
    <button
      class="
        py-1 px-2 rounded
        font-bold
        bg-background-50 text-text-700
        hover:bg-background-200 hover:text-text-900"
        >
      <RouterLink to="/login">
          Register
      </RouterLink>
    </button>
    to get started, or head over to our 
    <button
      class="
        py-1 px-2 rounded
        font-bold
        bg-background-50 text-text-700
        hover:bg-background-200 hover:text-text-900"
      >
      <RouterLink to="/about">
          About
      </RouterLink>
    </button>
    page for more information
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import Logo from '@/assets/icons/Logo.vue'
</script>
