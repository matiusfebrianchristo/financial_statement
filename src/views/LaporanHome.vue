<template>
  <main class="laporan-home">
    <div class="content wrapper" :class="{ full: isNav }">
      <div class="title-page text-center mt-4">
        <!-- <h2 class="title">Administrator</h2> -->
        <div class="light-mode content-header rounded m-md-5 p-1">
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

      <Modals />

      <!-- Akhir Button Add -->

      <!-- ============================================================================================= -->
      <!-- Content -->
      <!-- Grafik -->
      <div class="mx-md-5 mt-2">
        <div
          class="col bg-graphic line-chart text-light rounded"
          style="position: relative; width: 100%"
        >
          <line-chart />
          
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
                <tr v-for="data in fullDataTahunIni" :key="data.id">
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
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "LaporanHome",
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
      isDone: true,
      progress: false,
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
  async mounted() {
    if (localStorage.getItem("login") === "true") {
      localStorage.setItem("tambah_transaksi", false);
      await this.loadedData();
      this.getDataTahunIni()
    }
  },
  computed: {
    ...mapState({
      dataTahunIni: state =>  state.dataTahunIni,
      fullDataTahunan: state => state.fullDataTahunan,
      graphic: state => state.graphic,
      isNav: state => state.isNavActive
    }),
    ...mapGetters(["fullDataTahunIni", 'allResultTahunan']),
  },
  watch: {
    'allResultTahunan.profit': function(newValue){
      if(newValue){
        this.loadGraph()
      }
    }
  },
  methods: {
    ...mapActions([
      "getDataTahunIni",
      "getDataBulanIni",
      "fillDataGraph",
      "setFullDataTahunIni",
      'isAction',
    ]),

    // =================
    clickAddTrans() {
      this.isAction('add')
    },

    loadGraph(){
      const fillData = {
            data: this.filldata(
              moment.months(),
              this.fullDataTahunan.income,
              this.fullDataTahunan.outcome,
              this.fullDataTahunan.profit
            ),
            option: this.chartOption,
          };
          this.fillDataGraph(fillData);
    },

    async loadedData() {
      await this.getDataTahunIni().then((res) => {
        this.setFullDataTahunIni(res);
        const fillData = {
          data: this.filldata(
            moment.months(),
            this.fullDataTahunan.income,
            this.fullDataTahunan.outcome,
            this.fullDataTahunan.profit
          ),
          option: this.chartOption,
        };
        this.fillDataGraph(fillData);
      });
    },


    // Data Chartjs
    // ================================================
    filldata(month, income, outcome, profit) {
      return {
        title: "Laporan Keuangan",
        labels: month,
        datasets: [
          {
            label: "In",
            backgroundColor: "rgba(0, 255, 0, 0.2)",
            borderColor: "rgba(0, 255, 0, 0.8)",
            pointBackgroundColor: "green",
            borderWidth: 2,
            pointBorderColor: "green",
            fill: false,
            data: income,
          },
          {
            label: "Out",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            borderColor: "rgba(255, 0, 0, 0.8)",
            pointBackgroundColor: "red",
            borderWidth: 2,
            pointBorderColor: "red",
            fill: false,
            data: outcome,
          },
          {
            label: "Untung",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderColor: "rgba(0, 0, 255, 0.7)",
            pointBackgroundColor: "blue",
            borderWidth: 2,
            pointBorderColor: "blue",
            fill: false,
            data: profit,
          },
        ],
      };
    },
  },
};
</script>

<style>
</style>