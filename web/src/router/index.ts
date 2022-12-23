import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
