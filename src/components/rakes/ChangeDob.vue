<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUserInfo">
      <md-card class="md-layout-item md-size-100">
        <md-card-header>
          <div class="md-title">Person Details</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <md-field :class="getValidationClass('hbxId')">
                <label for="first-name">HBX ID</label>
                <md-input
                  name="hbx-id"
                  id="hbx-id"
                  v-model="form.hbxId"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.hbxId.required"
                  >An HBX ID is required</span
                >
                <span class="md-error" v-else-if="!$v.form.hbxId.minlength"
                  >Invalid HBX ID</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-size-50">
              <md-datepicker
                v-model="form.dob"
                :disabled="sending"
                id="dob"
                name="dob"
                :class="getValidationClass('dob')"
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

      <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="displaySnackbar" md-persistent>
        <span>{{message}}</span>
      </md-snackbar>

    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import format from "date-fns/format";

export default {
  name: "ChangePersonDOBForm",
  mixins: [validationMixin],
  data: () => ({
    form: {
      hbxId: null,
      dob: null,
      task: "change_person_dob"
    },
    sending: false,
    displaySnackbar: false,
    position: 'left',
    duration: 6000,
    isInfinity: false,
    message: null
  }),
  created: function() {
    this.$material.locale.dateFormat = "MM/dd/yyyy";
  },
  validations: {
    form: {
      hbxId: {
        required,
        minLength: minLength(6)
      },
      dob: {
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
      data["task"] = this.form.task;
      data["hbx_id"] = this.form.hbxId;
      data["dob"] = format(this.form.dob, "MM/dd/yyyy");
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
      this.message = "Successfully triggered rake task"
      this.displaySnackbar = true
      this.clearForm()
    },
    clearForm() {
      this.$v.$reset()
      this.form.hbxId = null
      this.form.dob = null
      this.sending = false
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
