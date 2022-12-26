import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Tour.vue"),
      meta: {
        public: true,
      },
    },
    {
      path: "/driver",
      name: "driver",
      component: () => import("../views/Driver.vue"),
      meta: {
        public: true,
      },
    },
  ],
});

export default router;
