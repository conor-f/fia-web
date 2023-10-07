<template>
  <NewConversationComponent/>
</template>

<script lang="ts">
import { toast } from "vue-sonner"
import NewConversationComponent from "@/components/NewConversationComponent.vue"

export default {
  name: 'NewConversationView',
  components: {
    NewConversationComponent,
  },
}
</script>
