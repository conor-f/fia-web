// @ts-nocheck
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"

export const useUserDetailsStore = defineStore('userDetailsStore', {
  state: () => {
    return {
      languageCode: useLocalStorage("languageCode", null)
    }
  },
  actions: {
    setLanguageCode(languageCode: string) {
      this.languageCode = languageCode;
    }
  },
})
