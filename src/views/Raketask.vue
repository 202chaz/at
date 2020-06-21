<template>
  <div>
    <div class="md-layout-item md-layout md-gutter">
      <div class="md-layout-item">
      <md-list>
        <md-subheader>Available Task</md-subheader>
        <md-list-item>
          <span class="md-list-item-text">NFP</span>
        </md-list-item>
        <md-list-item>
          <span class="md-list-item-text">Remove SSN</span>
        </md-list-item>
        <md-list-item>
          <span class="md-list-item-text">Move User Account Between Users</span>
        </md-list-item>
        <md-list-item>
          <span class="md-list-item-text">Change DOB</span>
        </md-list-item>
      </md-list>
      </div>
      <div class="md-layout-item"></div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.commit("SET_ROUTE", "Rake Task")
    }
  }
</script>
