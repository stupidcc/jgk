import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Validator from 'vue-validator'
Vue.use(Validator)
import VueResource from 'vue-resource'
Vue.use(VueResource)
import {InfiniteScroll} from 'mint-ui'
Vue.use(InfiniteScroll)
Vue.validator('required',{
  message:"此项为必输项",
  check:Vue.validator('required')
})
Vue.validator('isMobile',{
  message:"手机号格式不正确",
  check:function(val){
    return /^1[3|4|5|7|8][0-9]{9}$/.test(val)
  }
})


import App from './App.vue'
import routes from './config/routes'
const router=new VueRouter({
  routes
})
Vue.filter('time', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD';
  return moment(value).format(formatString);
});
new Vue({
  router,
  el:"#app",
  render:(h)=>h(App)
})
