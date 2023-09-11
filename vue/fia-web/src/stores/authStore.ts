import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    accessToken: useLocalStorage("accessToken", null),
    refreshToken: useLocalStorage("refreshToken", null)
  }),
  actions: {
    clearTokens() {
      this.accessToken = null;
      this.refreshToken = null;
    }
  },
  getters: {
    isLoggedIn() {
      return !(this.accessToken == null && this.refreshToken == null);
    },
  },
})
