<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary custom-blue" md-elevation="0">
        <span class="md-title">{{ this.$store.getters.currentRoute }}</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense">
              <md-icon v-if="!menuVisible">keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list :md-expand-single="expandSingle">
          <md-list-item>
            <md-field>
              <label for="environment">Select Environment</label>
              <md-select
                v-model="environment"
                name="environment"
                id="environment"
              >
                <md-option value="uat">UAT</md-option>
                <md-option value="preprod">Pre Prod</md-option>
                <md-option value="qa">QA</md-option>
                <md-option value="production">Production</md-option>
              </md-select>
            </md-field>
          </md-list-item>

          <md-list-item to="/admin/dashboard">
            <md-icon>dashboard</md-icon>
            <span class="md-list-item-text">Dashboard</span>
            <md-tooltip md-direction="right">Dashboard</md-tooltip>
          </md-list-item>

          <md-list-item md-expand>
            <md-icon>analytics</md-icon>
            <span class="md-list-item-text">Reports</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset" md-expand
                ><span class="main-title">Status Reports</span>
                <md-list slot="md-expand">
                  <router-link to="/admin/reports/enrollment_summary">
                    <md-list-item class="md-inset"
                      >Enrollment Summary</md-list-item
                    >
                  </router-link>
                  <md-list-item class="md-inset">Weekly SEP</md-list-item>
                  <md-list-item class="md-inset">SEP Details</md-list-item>
                  <md-list-item class="md-inset">COVID-19</md-list-item>
                  <md-list-item class="md-inset">IVL Summary</md-list-item>
                  <md-list-item class="md-inset">IVL Ward</md-list-item>
                  <md-list-item class="md-inset">IVL Plans</md-list-item>
                  <md-list-item class="md-inset">Dental</md-list-item>
                </md-list>
              </md-list-item>
              <md-list-item class="md-inset" md-expand
                ><span class="main-title">Canned Reports</span>
                <md-list slot="md-expand">
                  <md-list-item class="md-inset" md-expand
                    >SHOP
                    <md-list slot="md-expand">
                      <router-link
                        to="/admin/reports/renewing_group_dependent_age_off"
                      >
                        <md-list-item class="md-inset"
                          >Renewing Group <br />Dependent Age Off</md-list-item
                        >
                      </router-link>
                      <md-list-item class="md-inset"
                        >Dependent Age Off</md-list-item
                      >
                      <md-list-item class="md-inset"
                        >Congressional <br />Dependent Age Off</md-list-item
                      >
                      <md-list-item class="md-inset"
                        >Missing Renewals</md-list-item
                      >
                      <md-list-item class="md-inset"
                        >Incorrect Renewals</md-list-item
                      >
                      <md-list-item class="md-inset"
                        >Ward Renewals</md-list-item
                      >
                      <md-list-item class="md-inset"
                        >Employees <br />Missing SSN</md-list-item
                      >
                      <md-list-item class="md-inset"
                        >COBRA Enrollment</md-list-item
                      >
                      <md-list-item class="md-inset"
                        >Groups in Arrears</md-list-item
                      >
                    </md-list>
                  </md-list-item>
                  <md-list-item class="md-inset">INDIVIDUAL</md-list-item>
                </md-list>
              </md-list-item>
              <md-list-item class="md-inset">
                <router-link to="/admin/custom_reporting/employers" class="main-title">Custom Reports</router-link>
                <md-list slot="md-expand">
                  <router-link to="/admin/custom_reporting/employers">
                    <md-list-item class="md-inset">Employers</md-list-item>
                  </router-link>
                </md-list>
              </md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item v-on:click="logout()">
            <md-icon>power_settings_new</md-icon>
            <span class="md-list-item-text">Logout</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "PersistentMini",
  data() {
    return {
      menuVisible: true,
      expandSingle: true,
      environment: null
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = false;
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-blue {
  background: #007bc4;;
}
.md-app {
  height: calc(100vh - 84px);
}
// Demo purposes only
.md-drawer {
  width: 230px;
  // max-width: calc(100vw - 125px);
}
.main-title {
  font-weight: bold;
}
</style>
