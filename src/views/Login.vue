<template>
  <div class="md-layout md-gutter md-alignment-center-center">
    <div class="md-layout-item md-size-45">
      <md-content class="md-elevation-3 gutter login-form">
        <img src="hbxlogo.jpg" class="hbx-logo">
        <md-field md-clearable>
          <label>Username</label>
          <md-input v-model="username"></md-input>
        </md-field>

        <md-field>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>

        <md-button class="md-raised md-accent" v-on:click="login()">Sign In</md-button>
      </md-content>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    created() {
      this.$store.commit('SET_LAYOUT', 'simple-layout')
    },
    data() {
      return {
        username: "",
        password: ""
      };
    },
    methods: {
      login: function() {
        let username = this.username;
        let password = this.password;
        this.$store
          .dispatch("login", { username, password })
          .then(() => this.$router.push("/admin/dashboard"))
          .catch(err => console.log(err));
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hbx-logo {
    width: 130px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .login-form {
    margin-top: 150px;
    padding: 15px;
  }
  .md-field:last-child {
    margin-bottom: 40px;
  }
</style>
