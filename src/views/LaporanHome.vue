<template>
  <main class="laporan-home">
    <div class="content wrapper" :class="{ full: isNav }">
      <div class="title-page text-center mt-4">
        <!-- <h2 class="title">Administrator</h2> -->
        <div class="light-mode content-header rounded m-md-5 p-1">
          <!-- <nav
            class="road"
            style="--bs-breadcrumb-divider: '>'"
            aria-label="breadcrumb"
          >
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/">Home</router-link>
              </li>
              <li class="breadcrumb-item " aria-current="page">
                <router-link  @click.prevent to="/">Laporan Keuangan</router-link>
              </li>
            </ol>
          </nav> -->
          <h2>
            <strong>Tahun {{ new Date().getFullYear() }}</strong>
          </h2>
          <p>Data laporan keuangan tahun {{ new Date().getFullYear() }}.</p>
        </div>
        <hr />
      </div>
      <!-- Button Add -->
      <!-- Modals Add -->
      <div class="mx-md-5 mt-5 mb-0 clearfix">
        <button
          type="button"
          @click="clickAddTrans"
          class="btn btn-success float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Tambah Transaksi
        </button>
      </div>

      <!-- ====================================================================================== -->
      <!-- Modal -->

      <Modals ref="addButton" @clicked="addTransaksi" :cekImg="cek" :isEdit="isEdited" />

      <!-- Akhir Button Add -->

      <!-- ============================================================================================= -->
      <!-- Content -->
      <!-- Grafik -->
      <div class="mx-md-5 mt-2">
        <div class="col bg-graphic  line-chart text-light rounded" style="position: relative;  width:100%;">
          <line-chart  :chart-data="datacollection" :options="chartOption" />
        </div>
      </div>

      <!-- Table -->
      <div class="m-md-5 m-3">
        <div class="row bg-table shadow-lg rounded">
          <div class="col pt-3 table-responsive">
            <table class="table text-center">
              <thead>
                <tr>
                  <th>Bulan</th>
                  <th>Input</th>
                  <th>Output</th>
                  <th>Untung</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in fullDataChart" :key="data.id">
                  <th scope="row">{{ data.month }}</th>
                  <td>Rp. {{ data.income }}</td>
                  <td>Rp. {{ data.outcome }}</td>
                  <td>Rp. {{ data.profit }}</td>
                  <td>
                    <router-link
                      class="btn btn-primary"
                      :to="{
                        name: 'DetailBulanan',
                        params: { bulan: data.month, tahun: 2021 },
                      }"
                      >Detail</router-link
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import LineChart from "@/components/LineChart.vue";
import moment from "moment";
import Modals from "@/components/Modals.vue";
import axios from "axios";

export default {
  name: "LaporanHome",
  props: ["isNav"],
  components: {
    LineChart,
    Modals,
  },
  data() {
    return {
      // add Data Keuangan
      // ====================================
      nominal: null,
      status: "none",
      tanggal: null,
      deskripsi: null,
      bukti: null,
      cek: false,
      // ====================================
      dataGraphic: {},
      datacollection: null,
      isEdited: false,
      // ===============================
      // For chartjs
      fullDataChart: null,
      income: [],
      outcome: [],
      profit: [],
      dataMonth: {
        type: Number,
      },
      month: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      // =======================================================
      loaded: false,
      chartOption: {
        title: {
          display: true,
          text: "Laporan Keuangan",
          fontColor: "grey",
        },
        legend: {
          labels: {
            fontColor: "grey",
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "grey",
                suggestedMin: -400000,
                suggestedMax: 500000,
                beginAtZero: true,
                steps: 10,
                stepValue: 1,
              },
              scaleLabel: {
                display: true,
                labelString: "Jumlah",
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "grey",
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    if (localStorage.getItem("token_access") !== null) {
      localStorage.setItem('tambah_transaksi', false)
      this.loadedData();
    }
  },
  methods: {
    // =================
    clickAddTrans() {
      this.isEdited = false;
      localStorage.setItem('tambah_transaksi', true)
    },

    //Add Transaksi
    // ================================-===========
    async addTransaksi(value) {
      if (
        value.nominal !== null &&
        value.status !== null &&
        value.created_at !== null &&
        value.deskripsi !== null
      ) {
        await axios
          .post("administration/addadministration/", value)
          .then(async () => {
            this.$refs.addButton.clearInput()
            await this.loadedData();

            this.$toast.success("Data berhasil ditambahkan!", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });

            // const dataRes = JSON.parse(res.config.data)
            // const checkMonth = moment(dataRes.created_at, 'YYYY/MM/DD')
            // if(dataRes.tipe !== "pengeluaran"){

            //  var filtered =  this.fullDataChart.filter((el) => {
            //   return el.month == checkMonth.locale('id').format('MMMM')
            // })

            // } else{
            //   const tambah = this.outcome + dataRes.nominal
            //   this.outcome = tambah
            //   this.profit = tambah - this.outcome
            // }
            // console.log(filtered)

            if (this.cek === true) {
              this.cek = false;
            }

            // Set timeout for location reload
            // setTimeout(function () {
            //   console.log(res.config.data)
            // }, 2000);
          })
          .catch((err) => {
            console.log(err);
            this.$toast.error("Terjadi kesalahan", {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          });
      } else {
        console.log(value);
        this.$toast.error("Lengkapi Data!!", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }

      if (this.cek === true) {
        this.cek = false;
      }
    },

    // ======================================
    // Filter Data
    // filterByValue(array, string, action, value) {
    //   var data = array.filter(function (hero) {
    //     return hero.month == string;
    //   });

    //   if (action == "pemasukan") {
    //     return {
    //       income: data[0].income + value,
    //       outcome: data[0].outcome,
    //       profit: data[0].profit,
    //       month: string
    //     }
    //   } else {
    //     data[0].outcome + value;
    //     data[0].profit = data[0].income - data[0].outcome;
    //   }
    // },

    // Data graphic
    // =======================================

    async loadedData() {
      await axios
        .get("administration/administrationdataperyear/")
        .then((res) => {
          const obj = res.data[new Date().getFullYear()];
          const hasil = Object.keys(obj).map((key) => [Number(key), obj[key]]);
          let bulan;
          this.dataMonth = hasil.length;

          // ================================
          // Untuk tambah laporan keuangan
          if (this.fullDataChart !== null && localStorage.getItem('tambah_transaksi') !== false) {
            this.income = [];
            this.outcome = [];
            this.profit = [];
            this.fullDataChart = [];
            localStorage.setItem('tambah_transaksi', false)

            for (let i = 0; i < hasil.length; i++) {
              bulan = hasil[i][0];
              this.income.push(hasil[i][1].income);
              this.outcome.push(hasil[i][1].outcome);
              this.profit.push(hasil[i][1].profit);
              this.fullDataChart.push({
                income: this.income[i],
                outcome: this.outcome[i],
                profit: this.profit[i],
                month: (hasil[i][1].month = moment()
                  .locale("id")
                  .month(bulan - 1)
                  .format("MMMM")),
              });
            }
            
          }
          // ====================================
          // Untuk get data Asli
          else {
            
            this.fullDataChart = [];
            for (let i = 0; i < hasil.length; i++) {
              bulan = hasil[i][0];
              this.income.push(hasil[i][1].income);
              this.outcome.push(hasil[i][1].outcome);
              this.profit.push(hasil[i][1].profit);
              this.fullDataChart.push({
                income: this.income[i],
                outcome: this.outcome[i],
                profit: this.profit[i],
                month: (hasil[i][1].month = moment()
                  .locale("id")
                  .month(bulan - 1)
                  .format("MMMM")),
              });
            }
          }
          // console.log(
          //   this.filterByValue(this.fullDataChart, "January", "pemasukan", 2000)
          // );
        })
        .catch((err) => console.log(err));

      this.filldata();
    },

    // Data Chartjs
    // ================================================
    filldata() {
      this.datacollection = {
        title: "Laporan Keuangan",
        labels: this.month,
        datasets: [
          {
            label: "In",
            backgroundColor: "rgba(0, 255, 0, 0.2)",
            borderColor: "rgba(0, 255, 0, 0.8)",
            pointBackgroundColor: "green",
            borderWidth: 2,
            pointBorderColor: "green",
            fill: false,
            data: this.income,
          },
          {
            label: "Out",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            borderColor: "rgba(255, 0, 0, 0.8)",
            pointBackgroundColor: "red",
            borderWidth: 2,
            pointBorderColor: "red",
            fill: false,
            data: this.outcome,
          },
          {
            label: "Untung",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderColor: "rgba(0, 0, 255, 0.7)",
            pointBackgroundColor: "blue",
            borderWidth: 2,
            pointBorderColor: "blue",
            fill: false,
            data: this.profit,
          },
        ],
      };
    },
  },
};
</script>

<style>
</style>