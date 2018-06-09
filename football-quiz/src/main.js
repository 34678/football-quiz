// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  './assets/css/reset.css'
import  './assets/css/share.css'
import  './assets/js/flexlayout.js'
/* import  './assets/sass/index.scss' */
import axios from 'axios'
Vue.prototype.$http = axios
import jquery from 'jquery'
Vue.prototype.$ = jquery

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})