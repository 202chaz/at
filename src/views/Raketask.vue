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
          <md-list-item md-expand :md-expanded.sync="expandNews">
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text">Edit Person DOB</span>

            <md-list slot="md-expand">
              <md-list-item>
                <form novalidate class="md-layout">
                  <md-card class="md-layout-item">
                    <md-card-header>
                      <div class="md-title">Edit DOB</div>
                    </md-card-header>

                    <md-card-content>
                      <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                          <md-field>
                            <label for="dob">HBX ID</label>
                            <md-input name="hbxId" id="hbxId" />
                          </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                          <md-field>
                            <label for="dob">DOB</label>
                            <md-input name="dob" id="dob" />
                          </md-field>
                        </div>
                      </div>
                    </md-card-content>
                  </md-card>
                </form>
              </md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand>
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text">Remove SSN</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset"> </md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand>
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text">NFP</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset"> </md-list-item>
            </md-list>
          </md-list-item>
        </md-list>
      </div>
      <div class="md-layout-item md-size-60">
        <md-card>
          <md-card-header>
            <div class="md-title">Console Output</div>
          </md-card-header>
          <md-card-content>
            <md-list id="card-content"></md-list>
          </md-card-content>

          <md-card-actions>
            <md-button>Close</md-button>
          </md-card-actions>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListExpansion",
  created() {
    this.$store.commit("SET_LAYOUT", "app-layout"),
      this.$store.commit("SET_ROUTE", "Rake Task");
  },
  channels: {
    NotificationsChannel: {
      received(data) {
        const card = document.getElementById("card-content");
        if (card) {
          const items = document.querySelectorAll(".current-item");
          if (items) {
            Array.from(items, item => {
              item.style.removeProperty("color");
              item.style.removeProperty("font-weight");
              item.style.textDecoration = "line-through";
            })
          }
          card.insertAdjacentHTML(
            "beforeend",
            `<md-list-item class="current-item" style="color: #2b4888; font-weight: 600">${data.message}</md-list-item>`
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
  data() {
    return {
      expandNews: false,
      expandSingle: false
    };
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

.md-card-header {
  background-color: #eaeaea;
  padding: 8px;
}

.md-list {
  text-align: left;
}
</style>
