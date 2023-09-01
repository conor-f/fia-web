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
      console.log("HOWE(UHI");
      console.log(event);
      alert(this.username + ": " + this.password);
    },
    handle_register_button_press(event) {
      console.log("REG");
      console.log(event);
      alert(this.username + ": " + this.password);
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
