<template>
  <main class="content">
    <!-- ====================================================== -->
    <!-- Header -->

    <div class="content wrapper" :class="{ full: isNav }">
      <div class="title-page text-center mt-4">
        <div class="light-mode content-header rounded m-5 p-1">
          <h2><strong>Selamat Datang</strong></h2>
          <p>Selamat datang di Dashboard. Silahkan cek, update, atau tambah data.</p>
        </div>
      </div>

      <!-- ============================================================================================= -->
      <div class="list-data text-dark">

        <div class="row d-flex justify-items-center justify-content-center  m-auto">
          <div class="col-lg-3 text-center">
            <div class="list">
              <h1 class="mt-3">10</h1>
              <h5 class="font-18">Jumlah data</h5>
            </div>
              
          </div>
          <div class="col-lg-3 text-center">
              <div class="list">
              <h1 class="mt-3">10</h1>
              <h5 class="font-18">Jumlah data bulan ini</h5>
            </div>

          </div>
          <div class="col-lg-3 text-center">
              <div class="list">
              <h1 class="mt-3">10</h1>
              <h5 class="font-18">Jumlah data hari ini</h5>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================================================================= -->
      <!-- Content -->
      <!-- Grafik -->
      <!-- <div class="mx-md-5 mt-2">
        <div class="col bg-custom line-chart text-light rounded">
          <line-chart :chart-data="datacollection" :options="chartOption" />
        </div>
      </div> -->
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
// import LineChart from "@/components/LineChart.vue";
import moment from 'moment'
import axios from "axios";

export default {
  name: "Dashboard",
  props: ["isNav"],
  components: {
    // LineChart,
  },
  data() {
    return {
      dataGraphic: {},
      datacollection: null,
      loaded: false,
      fulldataDaily: null,
      isActiveNav: false,
      isMNavActive: false,
      chartOption: {
        legend: {
          labels: {
            fontColor: "#fff",
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "white",
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "white",
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      tanggal: "",
    };
  },
  mounted() {
    this.filldata();
    this.getDataDaily()
  },
  methods: {
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
    // ================================================
    // Data Daily Report 

  async getDataDaily(){
    await axios
        .get("administration/administrationdataperyear/")
        .then((res) => {
          const obj = res.data[new Date().getFullYear()];
          const hasil = Object.keys(obj).map((key) => [Number(key), obj[key]]);
          let bulan;
          this.dataMonth = hasil.length;

          // ================================
          // Untuk tambah laporan keuangan
          if (this.fullDataChart !== null) {
            this.income = [];
            this.outcome = [];
            this.profit = [];
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
            this.$toast.success("Data berhasil ditambahkan!", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
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
  },



    // Data graphic
    filldata() {
      this.datacollection = {
        labels: [
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
        datasets: [
          {
            label: "In",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            borderColor: "lightpink",
            pointBackgrounColor: "red",
            borderWidth: 2,
            pointBorderColor: "red",
            fill: false,
            data: this.income,
          },
          {
            label: "Out",
            backgroundColor: "rgba(0, 255, 0, 0.2)",
            borderColor: "lightgreen",
            pointBackgroundColor: "green",
            borderWidth: 2,
            pointBorderColor: "green",
            fill: false,
            data: this.outcome,
          },
          {
            label: "Untung",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderColor: "lightblue",
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
/* Content */
.list {
  background-color: #f8f9fa;
  padding: 20px 0;
  margin-top: 10px;
  border-radius: 40px;
  box-shadow: 1px 1px 20px 1px rgba(10, 10, 10, 0.5);
}

.list-data h1 {
  font-weight: 600;
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
