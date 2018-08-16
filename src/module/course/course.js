import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import '../../assets/js/flexible'
import '../../assets/js/config'
import './assets/styles/basic.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios

// /* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
