import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import { useStore } from '../store/index';
// const store = useStore();

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: () => import('../views/MainPage.vue') },
  { path: '/cart', component: () => import('../views/Cart.vue') },
  { path: '/item/:id', component: () => import('../views/ItemFullPage.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;