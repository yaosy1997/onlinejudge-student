import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import verify from './util/verify'
//import upload from './util/upload'
import animated from 'animate.css' 


Vue.config.productionTip = false

Vue.use(iView)
Vue.use(verify)
//Vue.use(upload)
Vue.use(animated)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
