import Vue from 'vue'
import VueRouter from 'vue-router'
import LaporanKeuangan from '../views/LaporanKeuangan.vue'
import LaporanHome from '../views/LaporanHome.vue'
import DetailBulanan from '../views/DetailBulanan.vue'
import BuktiDetailBulanan from '../views/BuktiDetailBulanan.vue'
import Dashboard from '../views/Dashboard.vue'
import Masuk from '../views/Masuk.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'LaporanKeuangan',
    component: LaporanKeuangan,
    redirect: {name: 'Dashboard'},
    children: [{
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard' }
      },
      {
        path: '/laporan_keuangan',
        name: 'LaporanHome',
        component: LaporanHome,
        meta: { title: 'Laporan Keuangan' }
      },
      {
        path: '/laporan_keuangan/:tahun-:bulan',
        name: 'DetailBulanan',
        component: DetailBulanan,
        meta: { title: 'Laporan Keuangan'  }
      },
      
    ]

  },
  {
    path: '/laporan_keuangan/:bulan/:id',
    name: 'BuktiDetailBulanan',
    component: BuktiDetailBulanan
  },
  {
    path: '/masuk',
    name: 'Masuk',
    component: Masuk,
    meta: { title: 'Masuk '  }
  },

  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to , from , next) => {
  document.title = to.meta.title

  next()
});

export default router