import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css';
import VueWechatTitle from 'vue-wechat-title';

Vue.use(VueWechatTitle);
Vue.use(Vant);

import 'lib-flexible'
import api from "@/axios/api.js";

Vue.prototype.$api = api
Vue.config.productionTip = false
export const type = 1
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title;
  }
  next();
})
