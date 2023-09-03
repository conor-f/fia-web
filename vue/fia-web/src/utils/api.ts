import axios from 'axios';
import { useAuthStore } from "@/stores/authStore.ts"

const authStore = useAuthStore()
export const API_BASE_URL = "https://fia-api.randombits.host/api/"


export function login(username, password) {
  // Note that login calls must be x-www-form-urlencoded.
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  return axios.post(API_BASE_URL + "user/login", params)
}

export function register(username, password) {
  return axios.post(
    API_BASE_URL + "user/create",
    {
      username: username,
      password: password
    },
  )
}

export function getUserDetails() {
  return axios.get(
    API_BASE_URL + "user/view-details",
    {
      headers: {
        "Authorization": "Bearer " + authStore.accessToken
      }
    }
  );
}
