<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUserInfo">
      <md-card class="md-layout-item md-size-100">
        <md-card-header>
          <div class="md-title">Census Employee Details</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <md-field :class="getValidationClass('ssn')">
                <label for="ssn">SSN</label>
                <md-input
                  name="ssn"
                  id="ssn"
                  v-model="form.ssn"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.ssn.required"
                  >A SSN is required</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.ssn.minlength || !$v.form.ssn.maxlength"
                  >Invalid SSN</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-size-50">
              <md-datepicker
                v-model="form.terminationDate"
                :disabled="sending"
                id="terminationDate"
                name="terminationDate"
                :class="getValidationClass('terminationDate')"
              >
                <label>Select date</label>
              </md-datepicker>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button
            type="submit"
            class="md-raised md-accent"
            :disabled="sending"
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
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import format from "date-fns/format";

export default {
  name: "ChangeCeDateOfTerminationForm",
  mixins: [validationMixin],
  data: () => ({
    form: {
      ssn: null,
      terminationDate: null,
      task: "change_ce_date_of_termination"
    },
    sending: false,
    displaySnackbar: false,
    position: "left",
    duration: 6000,
    isInfinity: false,
    message: null
  }),
  created: function() {
    this.$material.locale.dateFormat = "MM/dd/yyyy";
  },
  validations: {
    form: {
      ssn: {
        required,
        minLength: minLength(9),
        maxLength: maxLength(9)
      },
      terminationDate: {
        required
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    submit() {
      this.sending = true;
      const data = {};
      data["ssn"] = this.form.ssn;
      data["task"] = this.form.task;
      data["date_of_terminate"] = format(
        this.form.terminationDate,
        "MM/dd/yyyy"
      );
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
      this.clearForm();
    },
    clearForm() {
      this.$v.$reset();
      this.form.hbxId = null;
      this.form.terminationDate = null;
      this.sending = false;
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
