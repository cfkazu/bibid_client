import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueSession from 'vue-session'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(VueSession)
Vue.use(VueCookies)
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
