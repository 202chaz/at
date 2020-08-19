import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";
import Admin from "@/views/Admin.vue";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";
import Raketask from "@/views/Raketask.vue";
import Reports from "@/views/Reports.vue";
import Welcome from "@/views/Welcome.vue";
import HistoryTracker from "@/views/HistoryTracker.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "rakes",
        name: "RakeTask",
        component: Raketask
      },
      {
        path: "reports",
        name: "Reports",
        component: Reports
      },
      {
        path: "history",
        name: "History",
        component: HistoryTracker
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
