import axios from 'axios';
import { defineStore } from 'pinia'


/*
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
*/

export const API_BASE_URL = "https://fia-api.randombits.host/api/"

export function login(username, password) {
  // Note that login calls must be x-www-form-urlencoded.
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  axios.post(API_BASE_URL + "user/login", params).then(
    (response) => {
      alert(response);
      console.log(response);
    }
  );
}

export function register(username, password) {
  axios.post(
    API_BASE_URL + "user/create",
    {
      username: username,
      password: password
    },
  ).then(
    (response) => {
      alert(response);
      console.log(response);
    }
  );
}
