<template>
  <div id="app">
    <Header />
    <component v-bind:is="layout"></component>
    <Footer />
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SimpleLayout from "./layouts/SimpleLayout";

export default {
  computed: {
    layout() {
      return this.$store.getters.layout;
    }
  },
  components: {
    "app-layout": AppLayout,
    "simple-layout": SimpleLayout,
    Footer,
    Header
    // define as many layouts you want for the application
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
