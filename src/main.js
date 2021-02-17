import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/assets/css/main.css'
import 'vue2-datepicker/index.css'

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);

const header = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ0MjA2NjIyLCJqdGkiOiJkMTQ2YWYxZmQ5MTA0ODMzYjQ2ZjA5MWJjMDVhZjYzYyIsInVzZXJfaWQiOjF9.puXzw49b0xNM6D-p_exmbKgPk2CnGzqF5zYcXRzI3U8';

axios.defaults.baseURL = 'https://glacial-coast-08306.herokuapp.com/api/v1/'
axios.defaults.headers.common['Authorization'] = header;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
