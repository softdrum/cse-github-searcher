import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/Main';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    props: route => ({ query: route.query }),
    component: Main
  },
  {
    path: '/user/:login',
    name: 'Nodes',
    component: () => import('../views/UserInfo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router