import axios from 'axios';
import { useAuthStore } from "@/stores/authStore"

const authStore = useAuthStore()
export const API_BASE_URL = "https://fia-api.randombits.host/api/"


function getAuthenticatedRequest(axiosDetails: object) {
  // axiosDetails defined here:
  // https://axios-http.com/docs/api_intro
  return axios(axiosDetails).catch(error => {
    throw error;
  });
}


export function login(username: string, password: string) {
  // Note that login calls must be x-www-form-urlencoded.
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  return axios.post(API_BASE_URL + "user/login", params)
}

export function register(username: string, password: string) {
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
  ).catch(error => {
    if (error.response.status == 403) {
      console.log("Should redirect here...");
      // this.router.push({ path: "/" });
    } else {
      console.log(error);
    }

    throw error;
  });
}

export function deleteAccount() {
  return axios.post(
    API_BASE_URL + "user/delete",
    {},
    {
      headers: {
        "Authorization": "Bearer " + authStore.accessToken
      }
    }
  );
}

export function getConversationList() {
  return axios.get(
    API_BASE_URL + "user/get-conversations",
    {
      headers: {
        "Authorization": "Bearer " + authStore.accessToken
      }
    }
  ).catch(error => {
    if (error.response.status == 403) {
      console.log("Should redirect here...");
      // this.router.push({ path: "/" });
    } else {
      console.log(error);
    }

    throw error;
  });
}


export function getConversation(conversation_id: string) {
  return axios.get(
    API_BASE_URL + "user/get-conversation",
    {
      headers: {
        "Authorization": "Bearer " + authStore.accessToken
      },
      params: {
        "conversation_id": conversation_id
      }
    }
  ).catch(error => {
    if (error.response.status == 403) {
      console.log("Should redirect here...");
      // this.router.push({ path: "/" });
    } else {
      console.log(error);
    }

    throw error;
  });
}

export function converse(conversation_id: string, message: string) {
  return axios.post(
    API_BASE_URL + "teacher/converse",
    {
      conversation_id,
      message
    },
    {
      headers: {
        "Authorization": "Bearer " + authStore.accessToken
      }
    }
  );
}
