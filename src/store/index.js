import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    layout: "simple-layout",
    token: localStorage.getItem("token") || "",
    user: {},
    alertMsg: "",
    currentRoute: "Home",
    snackBarMsg: "",
    currentRakeTask: "",
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
    rake_processing(state) {
      state.status = "rake_request_processing";
    },
    rake_error(state) {
      state.status = "rake_error";
    },
    rake_complete(state, task) {
      state.status = "rake_complete";
      state.currentRakeTask = `${task}-${(Date.now() / 1000) | 0}`;
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
    set_snackbar_msg(state, msg) {
      state.snackBarMsg = msg;
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
    },
    rake_test({ commit }) {
      commit("rake_processing");
      axios
        .get("http://localhost:3001/rakeTest")
        .then(function() {
          commit("rake_complete");
        })
        .catch(function(error) {
          commit("rake_error");
          console.error(error);
        });
    },
    submit_rake_request({ commit }, data) {
      commit("rake_processing");
      axios
        .post("http://localhost:3001/rakes", {
          data
        })
        .then(function(resp) {
          const task = resp.data.data.task;
          commit("rake_complete", task);
        })
        .catch(function(error) {
          commit("rake_error");
          console.error(error);
        });
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
    snackBarMsg: state => state.snackBarMsg,
    currentRoute: state => state.currentRoute
  }
});
