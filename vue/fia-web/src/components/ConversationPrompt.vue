<template>
  <div class="card w-100 bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="card-title">
        {{ title }}
      </div>

      <div class="prose">
        {{ prompt }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

const props = defineProps({
  title: String,
  prompt: String,
});
</script>
