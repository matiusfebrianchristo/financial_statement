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
    name: 'LaporanKeuangan',
    component: LaporanKeuangan,
    redirect: '/dashboard',
    children: [{
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/laporan_keuangan',
        name: 'LaporanHome',
        component: LaporanHome,
      },
      {
        path: '/laporan_keuangan/:bulan',
        name: 'DetailBulanan',
        component: DetailBulanan
      }
    ]

  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router