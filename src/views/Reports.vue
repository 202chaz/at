<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-40">
        <md-field>
          <label for="movie">Area</label>
          <md-select name="area" id="area">
            <md-option value="employer">Employer</md-option>
            <md-option value="ivl">Individual</md-option>
            <md-option value="family">Family</md-option>
            <md-option value="reports">Reports</md-option>
            <md-option value="notices">Notices</md-option>
          </md-select>
        </md-field>
      </div>
    </div>
    <div class="full-control">
      <div class="list">
        <md-list :md-expand-single="expandSingle">
          <md-subheader>Reports</md-subheader>
          <md-list-item md-expand :md-expanded.sync="expandEmployersExport">
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text">Employers Report</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset">
                <ExportEmployers />
              </md-list-item>
            </md-list>
          </md-list-item>
          <md-list-item md-expand :md-expanded.sync="expandEmployersRosters">
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text">Employer Roster Report</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset">
                <EmployerRoster />
              </md-list-item>
            </md-list>
          </md-list-item>
          <md-list-item
            md-expand
            :md-expanded.sync="expandShopMonthlyEnrollments"
          >
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text">Shop Monthly Enrollments</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset">
                <ShopMonthlyEnrollments />
              </md-list-item>
            </md-list>
          </md-list-item>
          <md-list-item md-expand :md-expanded.sync="expandErPlanYearStatus">
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text"
              >Shop Employer Plan Year Status</span
            >

            <md-list slot="md-expand">
              <md-list-item class="md-inset">
                <ShopErPlanYearStatus />
              </md-list-item>
            </md-list>
          </md-list-item>
        </md-list>
      </div>
    </div>
  </div>
</template>

<script>
import ExportEmployers from "../components/rakes/ExportEmployers";
import EmployerRoster from "../components/rakes/EmployerRoster";
import ShopMonthlyEnrollments from "../components/rakes/ShopMonthlyEnrollments";
import ShopErPlanYearStatus from "../components/rakes/ShopErPlanYearStatus";
export default {
  name: "Reports",
  created() {
    this.$store.commit("SET_LAYOUT", "app-layout"),
      this.$store.commit("SET_ROUTE", "Reports");
  },
  components: {
    ExportEmployers,
    EmployerRoster,
    ShopMonthlyEnrollments,
    ShopErPlanYearStatus
  },
  data() {
    return {
      expandEmployersExport: false,
      expandEmployersRosters: false,
      expandShopMonthlyEnrollments: false,
      expandErPlanYearStatus: false,
      showConsole: false,
      isLoading: null
    };
  },
  channels: {
    NotificationsChannel: {
      received() {
        if (this.isLoading) {
          this.isLoading = false;
        }
      }
    }
  },
  mounted() {
    this.$cable.subscribe({
      channel: "NotificationsChannel",
      room: "public"
    });
  }
};
</script>
