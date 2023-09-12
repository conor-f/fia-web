<template>
  <div class="mt-5">
    <div class="mb-2">
      <label for="username_input">
        Username:
      </label>
        <input
          type="text"
          id="username_input"
          v-model="username"
        />
    </div>

    <br/>

    <div class="mb-2">
      <label for="password_input">
        Password:
      </label>
      <input
        type="password"
        id="password_input"
        @keyup.enter="handle_login_button_press"
        v-model="password"
      />
    </div>

    <br/>

    <va-button
      @click="handle_login_button_press"
      class="mr-4"
      >
      Login
    </va-button>

    <va-button @click="show_request_invite_code_modal = true"
      class="mt-3 ml-4"
      >
      Register
    </va-button>
  </div>


  <va-modal
    v-model="show_request_invite_code_modal"
    ok-text="Register"
    @ok="handle_register_button_press"
    blur
    >
    <h3>Invite Code</h3>
      <input
        class="mt-3"
        v-model="invite_code"
      />
  </va-modal>
</template>

<script lang="ts">
/** TODO:
 * Put inputs into flex/grid
 */
import { login, register } from "@/utils/api"
import { toast } from "vue-sonner"
import { useAuthStore } from "@/stores/authStore"

const authStore = useAuthStore()


export default {
  name: 'LoginView',
  data() {
    return {
      "username": "",
      "password": "",
      "invite_code": "",
      "show_request_invite_code_modal": false
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
      // TODO: Handle invite code.
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
</style>
