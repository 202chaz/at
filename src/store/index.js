import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    layout: "simple-layout",
    token: localStorage.getItem("token") || "",
    user: {},
    alertMsg: "",
    currentRoute: "Home",
    socket: {
      isConnected: false,
      message: "",
      reconnectError: false
    }
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
    },
    SOCKET_ONOPEN(state) {
      Vue.prototype.$socket = event.currentTarget;
      state.socket.isConnected = true;
    },
    SOCKET_ONCLOSE(state) {
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state) {
      console.error(state);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      state.socket.message = message;
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
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
