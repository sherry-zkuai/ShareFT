import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import './assets/style/global.css'

import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://192.168.0.105:3000/') // xxx填后台给的socket地址，端口号根据实际后台端口写
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
