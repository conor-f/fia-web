<template>
  <div class="login-container">
    <h1>This is a login page</h1>

    <label for="username_input">
      Username:
    </label>
      <input
        type="text"
        id="username_input"
        v-model="username"
      />

    <br/>
    <br/>

    <label for="password_input">
      Password:
    </label>
    <input
      type="password"
      id="password_input"
      v-model="password"
    />

    <br/>
    <br/>

    <input
      type="button"
      value="Login"
      @click="handle_login_button_press"
      />
    <input
      type="button"
      value="Register"
      @click="handle_register_button_press"
      />
  </div>
</template>

<script lang="ts">
import { login, register } from "@/utils/api"
import { toast } from "vue-sonner"
import { useAuthStore } from "@/stores/authStore"

const authStore = useAuthStore()


export default {
  name: 'LoginView',
  data() {
    return {
      "username": "",
      "password": ""
    }
  },
  methods: {
    handle_login_button_press() {
      login(this.username, this.password)
        .then(response => {
          toast.success("Login successful");
            authStore.accessToken = response["data"]["access_token"];
            authStore.refreshToken = response["data"]["refresh_token"];
            this.$router.push({ path: "/user-details" });
        })
        .catch(error => {
          console.log(error);
          toast.error("Login failed. Let me know!");
        });
    },
    handle_register_button_press() {
      register(this.username, this.password)
        .then(response => {
          toast.success("Registered successfully. you can now login.")
        })
        .catch(error => {
          toast.error("Registration failed. Let me know!")
        });
    },
  },
}
</script>

<style>
@media (min-width: 1024px) {
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
