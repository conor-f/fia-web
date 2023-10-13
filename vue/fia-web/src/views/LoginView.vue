<template>
  <!-- TODO: Fill bottom of screen with background colour. Related to DaisyUI. -->
  <div class="bg-background-50 pt-8
    grid grid-cols-3 justify-items-center items-center gap-3
    w-screen">

      <label
        for="username_input"
        class="text-text-900 justify-self-end md:text-xl"
        >
        Username:
      </label>
      <input
        type="text"
        placeholder="username"
        class="input col-span-2 input-bordered input-black h-10 w-full justify-self-start max-w-[11rem]"
        v-model="username"
        id="username_input"
        />

      <label
        for="password_input"
        class="text-text-900 md:text-xl justify-self-end"
        >
        Password:
      </label>
      <input
        type="password"
        id="password_input"
        @keyup.enter="handle_login_button_press"
        v-model="password"
        placeholder="password"
        class="input input-bordered col-span-2 input-black h-10 justify-self-start w-full max-w-[11rem]"
      />

    <button
      class="btn btn-primary justify-self-end"
      @click="handle_login_button_press"
      >
      Login
    </button>

    <!-- TODO: Can't use @click for some reason... -->
    <button
      class="btn btn-secondary justify-self-start"
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
        <form
          class="flex flex-col w-full gap-4 items-center"
          method="dialog"
          >
          <input
            type="text"
            placeholder=""
            class="input input-bordered input-black h-10 max-w-[14rem]" 
            v-model="invite_code"
            id="username_input"
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
import { useToast } from "vue-toastification"
import { useAuthStore } from "@/stores/authStore"

const authStore = useAuthStore()
const toast = useToast();

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

          authStore.setTokens(
            response["data"]["access_token"],
            response["data"]["refresh_token"]
          );

          this.$router.push({ path: "/new-conversation" });
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
