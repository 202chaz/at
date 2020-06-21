<template>
  <div class="admin-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit("SET_LAYOUT", "app-layout");
  }
};
</script>
