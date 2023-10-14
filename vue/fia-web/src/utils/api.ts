import axios from 'axios';
import { useAuthStore } from "@/stores/authStore"
import router from "@/router/index"

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
      authStore.clearTokens();
      router.push({ path: "/" });
    } else {
      console.log(error);
    }

    throw error;
  });
}

export function setUserDetails(selectedLanguage: str) {
  return axios.post(
    API_BASE_URL + "user/set-details",
    {
      language_code: selectedLanguage,
    },
    {
      headers: {
        "Authorization": "Bearer " + authStore.accessToken
      }
    }
  ).catch(error => {
    if (error.response.status == 403) {
      authStore.clearTokens();
      router.push({ path: "/" });
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
      authStore.clearTokens();
      router.push({ path: "/" });
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
      authStore.clearTokens();
      router.push({ path: "/" });
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

export function converseWithAudio(conversation_id: string, audio_file: Blob) {
  // TODO: This is a mess...
  return axios.post(
    API_BASE_URL + "teacher/converse-with-audio?conversation_id=" + conversation_id,
    {
      audio_file: audio_file
    },
    {
      headers: {
        "Authorization": "Bearer " + authStore.accessToken,
        "Content-Type": "multipart/form-data"
      },
    }
  );
}

export function getFlashcards() {
  return axios.get(
    API_BASE_URL + "flashcards/get-flashcards",
    {
      headers: {
        "Authorization": "Bearer " + authStore.accessToken
      },
      params: {
        "only_due": true
      }
    }
  ).catch(error => {
    if (error.response.status == 403) {
      authStore.clearTokens();
      router.push({ path: "/" });
    } else {
      console.log(error);
    }

    throw error;
  });
}

export function updateFlashcard(id: number, ease: number) {
  return axios.post(
    API_BASE_URL + "flashcards/update-flashcard",
    {
      id,
      ease,
    },
    {
      headers: {
        "Authorization": "Bearer " + authStore.accessToken
      },
    }
  ).catch(error => {
    if (error.response.status == 403) {
      authStore.clearTokens();
      router.push({ path: "/" });
    } else {
      console.log(error);
    }

    throw error;
  });
}

export function deleteFlashcard(id: number) {
  return axios.post(
    API_BASE_URL + "flashcards/delete-flashcard",
    {
      id,
    },
    {
      headers: {
        "Authorization": "Bearer " + authStore.accessToken
      },
    }
  ).catch(error => {
    if (error.response.status == 403) {
      authStore.clearTokens();
      router.push({ path: "/" });
    } else {
      console.log(error);
    }

    throw error;
  });
}

export function createFlashcard(
  conversation_id: string,
  front: string,
  back: string,
  both_sides: boolean,
) {
  return axios.post(
    API_BASE_URL + "flashcards/create-flashcard",
    {
      conversation_id,
      front,
      back,
      both_sides
    },
    {
      headers: {
        "Authorization": "Bearer " + authStore.accessToken
      },
    }
  ).catch(error => {
    if (error.response.status == 403) {
      authStore.clearTokens();
      router.push({ path: "/" });
    } else {
      console.log(error);
    }

    throw error;
  });
}

export function getAudio(
  text: string,
) {
  return fetch(
    API_BASE_URL + "teacher/get-audio",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + authStore.accessToken,
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text
      }),
      mode: "cors",
    },
  ).catch(error => {
    if (error.response.status == 403) {
      authStore.clearTokens();
      router.push({ path: "/" });
    } else {
      console.log(error);
    }

    throw error;
  });
}
