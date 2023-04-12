import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import layout from "@/components/layout/layout.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
      },
      {
        path: "/my",
        name: "My",
        component: () => import("@/views/my.vue"),
      },
    ],
  },
  {
    path: "/playList/:id",
    name: "playList",
    component: () => import("@/views/playList.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
