<template>
  <div class="content">
    <!-- Sidebar -->
    <transition name="slide-fade">
      <div
        class="d-lg-block d-none fixed sidebar bg-custom"
        :class="{ hide: isActiveNav, show: isMNavActive }"
      >
        <Sidebar />
      </div>
    </transition>

    <!-- Navbar  -->
    <Navbar
      class="wrapper"
      :isActive="isActiveNav"
      :class="{ full: isActiveNav }"
      @clicked="clickedToggle"
    />

    <!-- ====================================================== -->
    <!-- Header -->

    <div class="content wrapper" :class="{ full: isActiveNav }">
      <div class="title-page text-center mt-4">
        <!-- <h2 class="title">Administrator</h2> -->
        <div class="bg-custom content-header rounded m-5 p-1">
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
          <h2><strong>Welcome</strong></h2>
          <p>Hello admin, welcome to your dashboard.</p>
        </div>
      </div>

      <!-- Button Add -->
      <!-- Modals Add -->
      <div class="mx-md-5 mt-5 mb-0 clearfix">
        <button
          type="button"
          class="btn btn-success float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Transaksi
        </button>
      </div>

      <!-- ====================================================================================== -->
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog text-dark modal-xl modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Tambah Transaksi
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <!-- Untuk nominal -->
                <label for="nominal" class="form-label">Nominal</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Rp. </span>
                  <input
                    type="number"
                    class="form-control"
                    id="nominal"
                    placeholder="nominal..."
                  />

                  <!-- Untuk Status -->
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label"
                    >Status</label
                  >
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Status</option>
                    <option value="1">Input</option>
                    <option value="2">Output</option>
                  </select>
                </div>

                <!-- Untuk Tanggal -->
                <div class="mb-3">
                  <label for="tanggal" class="form-label">Tanggal</label>
                  <input
                    type="date"
                    class="form-control"
                    id="tanggal"
                    v-model="tanggal"
                    placeholder="DD/MM/YYYY"
                    @change="getTgl()"
                    max="2222-05-26"
                  />
                </div>

                <!-- Untuk Deskripsi -->
                <div class="mb-3">
                  <label for="deskripsi" class="form-label">Deskripsi</label>
                  <textarea
                    class="form-control"
                    id="Deskripsi"
                    rows="3"
                    placeholder="Isi deskripsi..."
                  ></textarea>
                </div>

                <!-- Untuk Bukti / File foto -->
                <div class="mb-3">
                  <label for="formFile" class="form-label">Bukti</label>
                  <input class="form-control" type="file" id="formFile" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Akhir Button Add -->

      <!-- ============================================================================================= -->
      <!-- Content -->
      <!-- Grafik -->
      <div class="mx-md-5 mt-2">
        <div class="col bg-custom line-chart text-light rounded">
          <line-chart :chart-data="datacollection" :options="chartOption" />
        </div>
      </div>

      <!-- Table -->
      <div class="m-md-5 m-3">
        <div class="row bg-custom shadow-lg rounded">
          <div class="col pt-3 table-responsive">
            <table class="table text-light text-center">
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
                <tr v-for="data in fullDataChart" :key="data.id" >
                  <th scope="row">{{ data.month }}</th>
                  <td>Rp. {{data.income}}</td>
                  <td>Rp. {{data.outcome}}</td>
                  <td>Rp. {{ data.profit}}</td>
                  <td>
                    <router-link class="btn btn-primary" to="/detail_bulanan"
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
  </div>
</template>

<script>
// @ is an alias to /src
import LineChart from "@/components/LineChart.vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import moment from 'moment';
import axios from "axios";

export default {
  name: "Dashboard",
  components: {
    LineChart,
    Sidebar,
    Navbar,
  },
  data() {
    return {
      dataGraphic: {},
      datacollection: null,
      // ===============================
      // For chartjs
      fullDataChart: [],
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
    axios
      .get("administration/administrationdataperyear/")
      .then((res) => {
        const obj = res.data[new Date().getFullYear()];
        const hasil = Object.keys(obj).map((key) => [Number(key), obj[key]]);
        let bulan;
        this.dataMonth = hasil.length;

        for (let i = 0; i < hasil.length; i++) {
          bulan = hasil[i][0];
          this.income.push(hasil[i][1].income);
          this.outcome.push(hasil[i][1].outcome);
          this.profit.push(hasil[i][1].profit);
          this.fullDataChart.push({
            income : this.income[i],
            outcome : this.outcome[i],
            profit : this.profit[i],
            month : hasil[i][1].month = moment().month(bulan - 1).format("MMMM"),
          });
        }
        console.log(this.fullDataChart)
      })
      .catch((err) => console.log(err));
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

    // Data graphic
    filldata() {
      this.datacollection = {
        labels: this.month,
        datasets: [
          {
            label: "In",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            borderColor: "lightpink",
            pointBackgrounColor: "red",
            borderWidth: 2,
            pointBorderColor: "red",
            fill: false,
            data: [this.income],
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
