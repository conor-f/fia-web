<template>
  <!-- TODO: Causing needless scrollbar -->
  <div class="bg-background-50 flex flex-col pt-8 h-screen w-screen">

    <div class="flex flex-row justify-center items-center">
      <label
        for="username_input"
        class="text-text-900 text-xl pr-5"
        >
        Username:
      </label>
      <input
        type="text"
        placeholder="username"
        class="input input-bordered input-black w-full max-w-xs"
        v-model="username"
        id="username_input"
        />
    </div>

    <div class="flex flex-row justify-center items-center">
      <label
        for="password_input"
        class="text-text-900 text-xl pr-5"
        >
        Password:
      </label>
      <input
        type="password"
        id="password_input"
        @keyup.enter="handle_login_button_press"
        v-model="password"
        placeholder="password"
        class="input input-bordered input-black w-full max-w-xs"
      />
    </div>

    <button
      class=""
      @click="handle_login_button_press"
      >
      Login
    </button>

    <!-- TODO: Can't use @click for some reason... -->
    <button
      class=""
      onclick="invite_code_modal.showModal()"
      >
      Register
    </button>
  </div>


  <dialog id="invite_code_modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <div class="font-bold text-lg">Invite Code</div>

      <p class="py-4">
        Please enter an invite code to continue. If you don't
        have an invite code, email hello@getfia.com to request one!
      </p>

      <div class="modal-action">
        <form method="dialog">
          <input
            class="mt-4"
            placeholder="There currently is none!"
            v-model="invite_code"
            @keyup.enter="handle_register_button_press()"
          />
          <button
            class="btn"
            @click="handle_register_button_press()"
            >
            Register
          </button>
        </form>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
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
      "password": "",
      "invite_code": "",
    }
  },
  methods: {
    handle_login_button_press() {
      login(this.username, this.password)
        .then(response => {
          toast.success("Login successful");
          authStore.accessToken = response["data"]["access_token"];
          authStore.refreshToken = response["data"]["refresh_token"];
          this.$router.push({ path: "/app-home" });
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
