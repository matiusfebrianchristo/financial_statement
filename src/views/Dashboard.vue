<template>
  <main class="content">
    <!-- ====================================================== -->
    <!-- Header -->

    <div class="content wrapper" :class="{ full: isNav }">
      <div class="title-page text-center mt-4">
        <div class="light-mode content-header rounded m-5 p-1">
          <h2><strong>Selamat Datang</strong></h2>
          <p>
            Selamat datang di Dashboard. Silahkan cek, update, atau tambah data.
          </p>
        </div>
      </div>
      <hr class="text-dark" />

      <!-- ============================================================================================= -->
      <div class="list-data mx-4">
        <DashInfo
          :income="formatPrice(incomeResult)"
          :outcome="formatPrice(outcomeResult)"
          :profit="formatPrice(profitResult)"
        />
      </div>

      <div class="dash-table row">
        <div class="dash-table-title text-dark">
          <div class="mt-3 mb-3 text-start">
            <h4 class="text-uppercase">Data laporan yang baru ditambahkan</h4>
          </div>
        </div>
        <div class="col-lg-6 col-12 bg-table shadow-lg table-responsive">
          <table class="table text-center">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nominal</th>
                <th>Tipe</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in dataBaru" :key="data.id">
                <th scope="row">{{ index + 1 }}</th>
                <td class="text-wrapper">{{ data.nominal }}</td>
                <td class="text-wrapper">
                  <p class="text-light" :class="CekStatus(data.tipe)">
                    {{ data.tipe }}
                  </p>
                </td>
                <td class="text-wrapper">{{ GantiTgl(data.created_at) }}</td>

                <!-- <td>
                    <router-link
                      class="btn btn-primary"
                      :to="{
                        name: 'DetailBulanan',
                        params: { bulan: data.month, tahun: 2021 },
                      }"
                      >Detail</router-link
                    >
                  </td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-lg-6 col-12"></div>
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src

import moment from "moment";
import DashInfo from "@/components/DashInfo.vue";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Dashboard",
  props: ["isNav"],
  components: {
    DashInfo,
  },
  data() {
    return {
      dataGraphic: {},
      dataBulanIni: null,
      loaded: false,
      outBulanIni: null,
      inBulanIni: null,
      proBulanIni: null,
      isActiveNav: false,
      isMNavActive: false,
      tanggal: "",
    };
  },
  async mounted() {
    // console.log(typeof localStorage.getItem("login"))
    if (localStorage.getItem("login") === "true") {
      await this.getDataDaily();
      this.getLimaDataBaru();
      // this.rekapBulanIni();
    }
  },
  computed: {
    ...mapState([
      "dataTahunIni",
      "incomeResult",
      "outcomeResult",
      "profitResult",
    ]),
    ...mapGetters(["dataBaru"]),
  },

  methods: {
    ...mapActions([
      "getDataTahunIni",
      "getDataBulanIni",
      "getInOutPro",
      "getLimaDataBaru",
    ]),

    CekStatus(value) {
      if (value === "pemasukan") {
        return value;
      } else {
        return value;
      }
    },
    GantiTgl(value) {
      return moment(value, "YYYY-MM-DD").format("Do MMMM YYYY");
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    // Hide Sidebar opsi
    clickedToggle() {
      if (this.isActiveNav === true) {
        this.isActiveNav = false;
      } else {
        this.isActiveNav = true;
      }
    },

    clickedToggleMobile() {
      if (this.isMNavActive === true) {
        this.isMNavActive = false;
      } else {
        this.isMNavActive = true;
      }
    },

    // rekapBulanIni() {
    //   const tgl = moment().format("DD-MM-YYYY");
    //   const tahun = moment(tgl, "DD-MM-YYYY").format("YYYY");
    //   const bulan = moment(tgl, "DD-MM-YYYY").format("M");

    //   // console.log(tahun)
    //   this.getDataBulanIni({ bulan, tahun }).then((res) => {
    //     console.log(res, "q");
    //     let dataIn;
    //     let oldDataIn = null;
    //     let dataOut;
    //     let oldDataOut = null;
    //     for (let i = 0; i < res.length; i++) {
    //       if (res[i][1].tipe !== "pemasukan") {
    //         if (oldDataOut !== null) {
    //           dataOut = res[i][1].nominal;
    //           oldDataOut = oldDataOut + dataOut;
    //         } else {
    //           dataOut = res[i][1].nominal;
    //         }
    //       } else {
    //         if (oldDataOut !== null) {
    //           dataIn = res[i][1].nominal;
    //           oldDataIn = oldDataIn + dataIn;
    //         } else {
    //           dataIn = res[i][1].nominal;
    //         }
    //       }
    //     }

    //     this.outBulanIni = dataOut;
    //     this.inBulanIni = dataIn;
    //     this.proBulanIni = dataIn - dataOut;
    //   });
    // },

    rekapTahunIni() {
      let data = null;
      let dataBaru;
      let obj = {};
      // Income
      for (let i = 0; i < this.dataTahunIni.length; i++) {
        if (data !== null) {
          dataBaru = this.dataTahunIni[i][1].income;
          data = data + dataBaru;
        } else {
          data = this.dataTahunIni[i][1].income;
        }
      }
      obj.income = data;
      //Outcome
      data = null;
      for (let i = 0; i < this.dataTahunIni.length; i++) {
        if (data !== null) {
          dataBaru = this.dataTahunIni[i][1].outcome;
          data = data + dataBaru;
        } else {
          data = this.dataTahunIni[i][1].outcome;
        }
      }
      obj.outcome = data;
      // Profit
      data = null;
      for (let i = 0; i < this.dataTahunIni.length; i++) {
        if (data !== null) {
          dataBaru = this.dataTahunIni[i][1].profit;
          data = data + dataBaru;
        } else {
          data = this.dataTahunIni[i][1].profit;
        }
      }
      obj.profit = data;

      this.getInOutPro(obj);
    },
    // ================================================
    // Data Daily Report

    async getDataDaily() {
      await this.getDataTahunIni()
        .then((res) => {
          let bulan;
          this.dataMonth = res.length;
          const income = [];
          const outcome = [];
          const profit = [];

          const fulldataDaily = [];
          for (let i = 0; i < res.length; i++) {
            bulan = res[i][0];
            income.push(res[i][1].income);
            outcome.push(res[i][1].outcome);
            profit.push(res[i][1].profit);
            fulldataDaily.push({
              income: income[i],
              outcome: outcome[i],
              profit: profit[i],
              month: (res[i][1].month = moment()
                .locale("id")
                .month(bulan - 1)
                .format("MMMM")),
            });
          }

          this.rekapTahunIni();
        })
        .catch((err) => console.log(err));
    },

    // Get 5 Data Terbaru
    // ============================================

    // Data Chartjs
    // ================================================
  },
};
</script>
<style>
/* Content */

.dash-table {
  margin: 10px 37px !important;
}
.dash-table .table-responsive {
  border-radius: 5px;
}

.dash-table-title {
  /* color: black!important; */
  margin: 60px 0px !important;
  margin-bottom: 0 !important;
}

.dash-table-title h4::after {
  content: "";
  margin-top: 20px;
  display: block;
  width: 45%;
  height: 1pt;
  background-color: rgba(128, 128, 128, 0.589);
}

.list {
  background-color: #f8f9fa;
  padding: 20px 0;
  margin-top: 10px;
  border-radius: 40px;
  box-shadow: 1px 1px 20px 1px rgba(10, 10, 10, 0.5);
}

.list-data h1 {
  font-weight: 600;
  font-size: 25px;
}
.list-data h5 {
  font-weight: 500;
  font-size: 18px;
  color: #2f495e;
}

.btn-add {
  float: right;
}

.bg-custom {
  /* background-color: #121729; */
  background-color: var(--dk-dark-bg);
}

.title::after {
  content: "";
  display: block;
  width: 150px;
  margin: auto;
  border-bottom: 3px solid grey;
}
.rounded {
  border-radius: 10px !important;
}

/* Animasi Vue */
.slide-fade-enter-active {
  transition: 0.5s;
}
.slide-fade-leave-active {
  transition: 0.5s;
}
.slide-fade-enter,
.slide-fade-leave-to .slide-fade-leave-active {
  transform: translateX(-200px);
  opacity: 0;
}
</style>
