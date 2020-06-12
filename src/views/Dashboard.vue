<template>
  <h3>Dashboard View</h3>
</template>

<script>
  export default {
    created() {
      this.$store.commit('SET_LAYOUT', 'app-layout')
    }
  }
</script>
