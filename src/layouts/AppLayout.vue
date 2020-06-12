<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Admin App</span>
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

          <md-list-item to="/admin/rakes">
            <md-icon>chrome_reader_mode</md-icon>
            <span class="md-list-item-text">Rake Task</span>
            <md-tooltip md-direction="right">Rake Task</md-tooltip>
          </md-list-item>

          <md-list-item to="/admin/reports">
            <md-icon>poll</md-icon>
            <span class="md-list-item-text">Reports</span>
            <md-tooltip md-direction="right">Reports</md-tooltip>
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
    name: 'PersistentMini',
    data: () => ({
      menuVisible: false
    }),
    methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      },
      logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
    }
  }
</script>

<style lang="scss" scoped>
  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>
