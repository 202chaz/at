import Vue from "vue";
import ActionCableVue from "actioncable-vue";
import App from "./App.vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: "error",
  connectionUrl: "ws://localhost:3000/cable", // or function which returns a string with your JWT appended to your server URL as a query parameter
  connectImmediately: true
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
