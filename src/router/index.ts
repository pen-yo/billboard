import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/comparison",
      component: () => import("@/views/Comparison.vue"),
    },
    {
      path: "/ranking",
      component: () => import("@/views/Ranking.vue"),
    },
  ],
});

export default router;
