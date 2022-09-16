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
        path: 'files',
        name: 'Files',
        component: () => import(/* webpackChunkName: "files" */ '../views/Files.vue'),
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
        children: [
          {
            path: 'mecab',
            name: 'Mecab',
            component: () => import(/* webpackChunkName: "mecab" */ '../components/Mecab.vue'),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
