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
          <md-subheader>Rakes</md-subheader>

          <md-list-item md-expand :md-expanded.sync="expandDob">
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text">Change Person DOB</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset">
                <ChangeDob />
              </md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand :md-expanded.sync="expandRemoveSsn">
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text">Remove Person SSN</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset">
                <RemoveSsn />
              </md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand :md-expanded.sync="expandExchangeSsn">
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text">Exchange SSN Between accounts</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset">
                <ExchangeSsn />
              </md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item
            md-expand
            :md-expanded.sync="expandMoveAccountBetweenPeople"
          >
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text"
              >Move User Account Between People</span
            >

            <md-list slot="md-expand">
              <md-list-item class="md-inset">
                <MoveAccountBetweenPeople />
              </md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand :md-expanded.sync="expandCeDateOfTermination">
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text"
              >Change Census Employee Date of Termination</span
            >

            <md-list slot="md-expand">
              <md-list-item class="md-inset">
                <ChangeCeDateOfTermination />
              </md-list-item>
            </md-list>
          </md-list-item>
          <md-list-item
            md-expand
            :md-expanded.sync="expandErFailingParticipation"
          >
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text"
              >Generate Employers Failing Minimum Particiption</span
            >

            <md-list slot="md-expand">
              <md-list-item class="md-inset">
                <EmployersFailingMinimumParticipation />
              </md-list-item>
            </md-list>
          </md-list-item>
        </md-list>
      </div>
      <div class="md-layout-item md-size-60">
        <md-card v-if="showConsole">
          <md-card-header>
            <div class="md-title">Console Output</div>
          </md-card-header>
          <md-card-content>
            <md-progress-spinner
              md-mode="indeterminate"
              v-if="isLoading"
            ></md-progress-spinner>
            <md-list id="card-content"></md-list>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import ChangeDob from "../components/rakes/ChangeDob";
import RemoveSsn from "../components/rakes/RemoveSsn";
import ExchangeSsn from "../components/rakes/ExchangeSsn";
import MoveAccountBetweenPeople from "../components/rakes/MoveAccountBetweenPeople";
import ChangeCeDateOfTermination from "../components/rakes/ChangeCeDateOfTermination";
import EmployersFailingMinimumParticipation from "../components/rakes/EmployersFailingMinimumParticipation";
export default {
  name: "ListExpansion",
  created() {
    this.$store.commit("SET_LAYOUT", "app-layout"),
      this.$store.commit("SET_ROUTE", "Rake Task");
  },
  components: {
    ChangeDob,
    RemoveSsn,
    ExchangeSsn,
    MoveAccountBetweenPeople,
    ChangeCeDateOfTermination,
    EmployersFailingMinimumParticipation
  },
  channels: {
    NotificationsChannel: {
      received(data) {
        if (this.isLoading) {
          this.isLoading = false;
        }
        const card = document.getElementById("card-content");
        if (card) {
          const items = document.querySelectorAll(".current-item");
          if (items) {
            Array.from(items, item => {
              item.style.removeProperty("color");
              item.style.removeProperty("font-weight");
            });
          }
          card.insertAdjacentHTML(
            "beforeend",
            `<md-list-item class="current-item" style="color: #4ceb34; font-weight: 600">${data.message}</md-list-item>`
          );
        }
      }
    }
  },
  mounted() {
    this.$cable.subscribe({
      channel: "NotificationsChannel",
      room: "public"
    });
  },
  watch: {
    "$store.state.currentRakeTask": function() {
      const taskName = this.$store.state.currentRakeTask.split("-")[0];
      taskName === "change_person_dob" ? (this.expandDob = false) : "";
      taskName === "remove_person_ssn" ? (this.expandRemoveSsn = false) : "";
      taskName === "exchange_ssn_between_two_accounts"
        ? (this.expandExchangeSsn = false)
        : "";
      taskName === "move_user_account_between_two_people_accounts"
        ? (this.expandMoveAccountBetweenPeople = false)
        : "";
      taskName === "change_ce_date_of_termination"
        ? (this.expandCeDateOfTermination = false)
        : "";
      taskName === "employers_failing_minimum_participation"
        ? (this.expandErFailingParticipation = false)
        : "";
      this.showConsoleUi();
    }
  },
  data() {
    return {
      expandTestRake: false,
      expandDob: false,
      expandRemoveSsn: false,
      expandExchangeSsn: false,
      expandCeDateOfTermination: false,
      expandErFailingParticipation: false,
      expandSingle: false,
      showConsole: false,
      isLoading: null
    };
  },
  methods: {
    rakeTest: function() {
      (this.showConsole = true),
        (this.isLoading = true),
        this.$store
          .dispatch("rake_test")
          .then(data => console.log(data))
          .catch(err => console.error(err));
    },
    showConsoleUi() {
      this.showConsole = true;
      this.isLoading = true;
    },
    closeConsole: function() {
      this.showConsole = false;
    }
  }
};
</script>

<style lang="scss" scoped>
$list-width: 40%;

.full-control {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
}

.list {
  width: $list-width;
}

.full-control > .md-list {
  width: $list-width;
  max-width: 100%;
  height: 400px;
  display: inline-block;
  overflow: auto;
  border: 1px solid rgba(#000, 0.12);
  vertical-align: top;
}

.control {
  min-width: 250px;
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.md-card-content {
  background-color: #000;
}

.md-list.md-theme-default {
  color: #4ceb34;
  background-color: transparent;
}

.md-card-header {
  background-color: #686968;
  color: #eaeaea;
  padding: 8px;
}

.md-list {
  text-align: left;
}

.md-progress-spinner {
  margin-top: 20px;
}
</style>
