import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    layout: "simple-layout",
    token: localStorage.getItem("token") || "",
    user: {},
    alertMsg: "",
    currentRoute: "Home"
  },
  mutations: {
    SET_LAYOUT(state, payload) {
      state.layout = payload;
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_error(state) {
      state.status = "error";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
      state.alertMsg = "You've successfully signed in.";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.alertMsg = "You've successfully signed out.";
    },
    SET_ROUTE(state, route) {
      state.currentRoute = route;
    }
  },
  actions: {
    login({ commit }, user) {
      commit("auth_request");
      localStorage.setItem("token", user);
      commit("auth_success", user);
    },
    logout({ commit }) {
      commit("logout");
      localStorage.removeItem("token");
    }
  },
  modules: {},
  getters: {
    layout(state) {
      return state.layout;
    },
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    alertMsg: state => state.alertMsg,
    currentRoute: state => state.currentRoute
  }
});
