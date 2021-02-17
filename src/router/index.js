import Vue from 'vue'
import VueRouter from 'vue-router'
import LaporanKeuangan from '../views/LaporanKeuangan.vue'
import LaporanHome from '../views/LaporanHome.vue'
import DetailBulanan from '../views/DetailBulanan.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/laporan_keuangan',
    name: 'LaporanKeuangan',
    component: LaporanKeuangan,
    children: [{
      path: '',
      name: 'LaporanHome',
      component: LaporanHome

    },
    {
      path: ':bulan',
      name: 'DetailBulanan',
      component: DetailBulanan
    }]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router