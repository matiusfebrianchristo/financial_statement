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

    <!-- Navbar -->
    <Navbar
      class="wrapper"
      :isActive="isActiveNav"
      :class="{ full: isActiveNav }"
      @clicked="clickedToggle"
    />

    <!-- ==================================================================== -->
    <!-- Header -->
    <div class="content wrapper" :class="{ full: isActiveNav }">
      <div class="title-page text-center mt-4">
        <div class="bg-custom content-header rounded m-5 p-1">
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
      <div class="row mx-md-5 mt-2">
        <div class="col bg-custom text-light rounded">
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
                  <th>No.</th>
                  <th>Nominal</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                  <th>Deskripsi</th>
                  <th>Bukti</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Rp. 7000</td>
                  <td>Input</td>
                  <td>20 Januari 2021</td>
                  <td>Ini pemasukan</td>
                  <td><a href="#" target="_blank">IMG</a></td>
                  <td>
                    <div class="dropdown">
                      <button
                        class="btn btn-success dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Action
                      </button>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a
                            class="dropdown-item btn btn-primary"
                            href=""
                            @click.prevent
                            ><i class="bi bi-pencil-square"></i> Edit</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="" @click.prevent
                            ><i class="bi bi-trash-fill"></i> Delete</a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Rp. 7000</td>
                  <td>Input</td>
                  <td>20 Januari 2021</td>
                  <td>Ini pemasukan</td>
                  <td><a href="#" target="_blank">IMG</a></td>
                  <td>
                    <div class="dropdown">
                      <button
                        class="btn btn-success dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Action
                      </button>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a
                            class="dropdown-item btn btn-primary"
                            href=""
                            @click.prevent
                            ><i class="bi bi-pencil-square"></i> Edit</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="" @click.prevent
                            ><i class="bi bi-trash-fill"></i> Delete</a
                          >
                        </li>
                      </ul>
                    </div>
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

export default {
  name: "Home",
  components: {
    LineChart,
    Sidebar,
    Navbar,
  },
  data() {
    return {
      datacollection: null,
      loaded: false,
      isActiveNav: false,
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
  },
  methods: {
    getTgl() {
      console.log(this.tanggal);
    },
    // Hide Sidebar opsi
    clickedToggle() {
      if (this.isActiveNav === true) {
        this.isActiveNav = false;
      } else {
        this.isActiveNav = true;
      }
    },
    filldata() {
      this.datacollection = {
        labels: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
        ],
        datasets: [
          {
            label: "Data 1",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            borderColor: "lightpink",
            pointBackgroundColor: "red",
            borderWidth: 2,
            pointBorderColor: "red",
            fill: false,
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 4],
          },
          {
            label: "Data 2",
            backgroundColor: "rgba(0, 255, 0, 0.2)",
            borderColor: "lightgreen",
            pointBackgroundColor: "green",
            borderWidth: 2,
            pointBorderColor: "green",
            fill: false,
            data: [4, 6, 4, 6, 4, 6, 4, 6, 4, 6, 7, 2],
          },
          {
            label: "Data 3",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderColor: "lightblue",
            pointBackgroundColor: "blue",
            borderWidth: 2,
            pointBorderColor: "blue",
            fill: false,
            data: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 5, 7],
          },
        ],
      };
    },
  },
};
</script>
<style scoped>
/* .dashboard {
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #1d2338;
  /* background-image: linear-gradient(to bottom right, green , blue); */
/* height: 100vh; */
/* width: 100vw; */
/* } */

.btn-add {
  float: right;
}

/* Dropdown Action Menu */

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
