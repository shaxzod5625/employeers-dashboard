import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Paginate from 'vuejs-paginate'
import JwPagination from 'jw-vue-pagination'
import Vuelidate from 'vuelidate'
import './assets/tailwind.css'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.component('Paginate', Paginate)
Vue.component('jw-pagination', JwPagination);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
