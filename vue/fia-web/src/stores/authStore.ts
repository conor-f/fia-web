import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    accessToken: null,
    refreshToken: null
  }),
})
