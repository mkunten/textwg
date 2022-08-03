import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      },
      {
        path: 'viewer',
        name: 'Viewer',
        component: () => import(/* webpackChunkName: "viewer" */ '../views/Viewer.vue'),
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import(/* webpackChunkName: "analysis" */ '../views/Analysis.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
