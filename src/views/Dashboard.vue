<template>
  <div class="md-layout md-gutter dashboard-container">
    <div class="md-layout-item md-layout md-gutter md-size-100">
      <div class="md-layout-item">
        <router-link to="/admin/rakes">
          <md-card md-elevation-5>
            <md-card-header>
              <div class="md-title">Rake Task</div>
            </md-card-header>
            <md-card-content>
              <md-card-media>
                <img src="/reports.png" alt="reports image" class="images" />
              </md-card-media>
            </md-card-content>
          </md-card>
        </router-link>
      </div>

      <div class="md-layout-item">
        <router-link to="/admin/reports/all">
          <md-card md-elevation-5>
            <md-card-header>
              <div class="md-title">Reports</div>
            </md-card-header>
            <md-card-content>
              <md-card-media>
                <img src="/rake.webp" alt="reports image" class="images" />
              </md-card-media>
            </md-card-content>
          </md-card>
        </router-link>
      </div>

      <div class="md-layout-item">
        <router-link to="/admin/history">
          <md-card md-elevation-5>
            <md-card-header>
              <div class="md-title">History Tracker</div>
            </md-card-header>
            <md-card-content>
              <md-card-media>
                <img
                  src="/magnifying-glass.png"
                  alt="Settings"
                  class="images"
                />
              </md-card-media>
            </md-card-content>
          </md-card>
        </router-link>
      </div>
    </div>
    <div class="md-layout-item md-layout md-gutter md-size-100">
      <div class="md-layout-item">
        <md-card md-elevation-5>
          <md-card-header>
            <div class="md-title">Trained Expert Management</div>
          </md-card-header>
          <md-card-content>
            <md-card-media>
              <img
                src="/expert.png"
                alt="Trained Expert Management"
                class="images"
              />
            </md-card-media>
          </md-card-content>
        </md-card>
      </div>

      <div class="md-layout-item">
        <md-card md-elevation-5>
          <md-card-header>
            <div class="md-title">Glue</div>
          </md-card-header>
          <md-card-content>
            <md-card-media>
              <img src="/gluedb.png" alt="Glue" class="images" />
            </md-card-media>
          </md-card-content>
        </md-card>
      </div>

      <div class="md-layout-item">
        <md-card md-elevation-5>
          <md-card-header>
            <div class="md-title">Settings</div>
          </md-card-header>
          <md-card-content>
            <md-card-media>
              <img src="/settings.png" alt="Settings" class="images" />
            </md-card-media>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.commit("SET_LAYOUT", "app-layout"),
      this.$store.commit("SET_ROUTE", "Dashboard");
  }
};
</script>

<style>
.dashboard-container {
  padding-top: 2px;
  margin-bottom: 40px;
}
.md-card {
  margin-bottom: 15px;
  text-align: center;
}
.md-card-content {
  text-align: center;
}
.images {
  max-height: 90px;
  max-width: 90px;
}
</style>
