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
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      "username": "",
      "password": ""
    }
  },
  computed: {
    /*
    ...mapState([
      'showSidebar',
      'showDetailsTable'
    ]),
    */
  },
  methods: {
    handle_login_button_press(event) {
      // Note that login calls must be x-www-form-urlencoded.
      const params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);
      axios.post(
        "https://fia-api.randombits.host/api/user/login",
        params
      ).then(
        (response) => {
          console.log(response);
        }
      );
    },
    handle_register_button_press(event) {
      axios.post(
        "https://fia-api.randombits.host/api/user/create",
        {
          username: this.username,
          password: this.password
        },
      ).then(
        (response) => {
          console.log(response);
        }
      );
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
