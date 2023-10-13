// @ts-nocheck
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      accessToken: useLocalStorage("accessToken", null),
      refreshToken: useLocalStorage("refreshToken", null)
    }
  },
  actions: {
    clearTokens() {
      this.accessToken = null;
      this.refreshToken = null;
    },
    setTokens(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    }
  },
  getters: {
    isLoggedIn(): boolean {
      return !(this.accessToken == null && this.refreshToken == null);
    },
  },
})
