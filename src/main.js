import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/assets/css/main.css'
import 'vue2-datepicker/index.css'
import 'moment/locale/id.js'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';



Vue.component('v-select', vSelect)

Vue.use(VueToast);



axios.defaults.baseURL = 'https://glacial-coast-08306.herokuapp.com/api/v1/'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token_access') ;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
