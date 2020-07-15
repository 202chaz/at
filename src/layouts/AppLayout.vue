<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary custom-blue" md-elevation="0">
        <md-button
          class="md-icon-button"
          @click="toggleMenu"
          v-if="!menuVisible"
        >
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">{{ this.$store.getters.currentRoute }}</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item to="/admin/dashboard">
            <md-icon>dashboard</md-icon>
            <span class="md-list-item-text">Dashboard</span>
            <md-tooltip md-direction="right">Dashboard</md-tooltip>
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
  data: () => ({
    menuVisible: false
  }),
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
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
    background: linear-gradient(60deg,#448aff,#0644ad);
  }
  .md-app {
    height: calc(100vh - 84px);
  }

  // Demo purposes only
  .md-drawer {
    width: 230px;
    // max-width: calc(100vw - 125px);
  }
</style>
