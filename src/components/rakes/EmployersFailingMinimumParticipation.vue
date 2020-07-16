<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUserInfo">
      <md-card class="md-layout-item md-size-100">
        <md-card-header>
          <div class="md-title">Trigger Task</div>
        </md-card-header>

        <md-card-actions>
          <md-button
            type="submit"
            class="md-raised md-accent"
            v-on:click="submit()"
            >Submit</md-button
          >
        </md-card-actions>
      </md-card>

      <md-snackbar
        :md-position="position"
        :md-duration="isInfinity ? Infinity : duration"
        :md-active.sync="displaySnackbar"
        md-persistent
      >
        <span>{{ message }}</span>
      </md-snackbar>
    </form>
  </div>
</template>

<script>
export default {
  name: "ERFailingForm",
  data: () => ({
    form: {
      task: "employers_failing_minimum_participation"
    },
    sending: false,
    displaySnackbar: false,
    position: "left",
    duration: 6000,
    isInfinity: false,
    message: null
  }),

  methods: {
    submit() {
      this.sending = true;
      const data = {};
      data["task"] = this.form.task;
      this.$store
        .dispatch("submit_rake_request", data)
        .then(this.showSnackMsg())
        .catch(err => console.error(err));
    },
    validateUserInfo() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.submit();
      }
    },
    showSnackMsg() {
      this.message = "Successfully triggered rake task";
      this.displaySnackbar = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.md-snackbar {
  background-color: #1ae28a;
  background: linear-gradient(-45deg, #209077 0%, #1ae28a 100%);
}
</style>
