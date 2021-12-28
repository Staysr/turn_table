import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta:{
      title: '满减活动'
    }
  },
  {
    path: '/prize',
    name: 'prize',
    component: () => import('@/views/prize.vue'),
    meta:{
      title: '优惠券'
    }
  },
  {
    path: '/version',
    name: 'version',
    component: () => import('@/views/version.vue'),
  },
  {
    path: '/circle',
    name: 'circle',
    component: () => import('@/views/circle.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
