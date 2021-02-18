<template>
  <div class="content">
    <!-- ==================================================================== -->
    <!-- Header -->
    <div class="content wrapper" :class="{ full: isActiveNav }">
      <div class="title-page text-center mt-4">
        <div class="bg-custom content-header rounded m-5 p-1">
          <h2>
            <strong>{{ this.$route.params.bulan }}</strong>
          </h2>
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

      <Modals />

      <!-- Akhir Button Add -->

      <!-- ============================================================================================= -->
      <!-- Content -->

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
                          <a class="dropdown-item" href="" @click.prevent
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
            <button @click="loadedData">Cek</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Modals from "@/components/Modals.vue";
// import moment from "moment";
import axios from "axios";

export default {
  name: "DetailBulanan",
  props: ["isNav"],
  components: {
    Modals,
  },
  data() {
    return {
      datacollection: null,
      loaded: false,
      isActiveNav: false,
      income: [],
      outcome: [],
      profit: [],
      fullDataChart: [],
    };
  },
  mounted() {
    // this.loadedData();
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

    // Data AXIOS
    // =====================================
    async loadedData() {

      // let formdata = new FormData();
      // formdata.append("year", "2021");
      // formdata.append("month", "2");

      // let requestOptions = {
      //   method: "GET",
      //   body: formdata,
      //   redirect: "follow",
      // };
      await  axios.get("administration/administrationdetail/")
        .then((res) => {

          console.log(res);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style>
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
