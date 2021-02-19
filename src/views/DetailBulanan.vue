<template>
  <div class="content">
    <!-- ==================================================================== -->
    <!-- Header -->
    <div class="content wrapper" :class="{ full: isNav }">
      <div class="title-page text-center mt-4">
        <div class="bg-custom content-header rounded m-5 p-1">
          <div class="row row-cols-5">
            <div class="col"><i @click="$router.go(-1)" class="bi bi-arrow-left back-arrow"></i></div>
            <div class="col"></div>
            <div class="col">
              <h2>
                <strong>{{ this.$route.params.bulan }} {{ this.$route.params.tahun }} </strong>
              </h2>
            </div>
            <div class="col"></div>
            <div class="col"></div>
          </div>
          <hr>
          <p>Data laporan keuangan pada bulan {{ this.$route.params.bulan}} tahun {{ this.$route.params.tahun }}.</p>
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
                <tr v-for="(d, index) in fullDataBulanan" :key="d.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>Rp. {{ d[1].nominal }}</td>
                  <td> <p :class="CekStatus(d[1].tipe)">{{ d[1].tipe }} </p></td>
                  <td>{{ GantiTgl(d[1].created_at) }}</td>
                  <td>{{ d[1].deskripsi }}</td>
                  <td>
                    <a
                      v-if="d[1].bukti !== 'None'"
                      :href="`https://glacial-coast-08306.herokuapp.com${d[1].bukti}`"
                      
                      target="_blank"
                      >Bukti</a
                    >
                    <p v-else>{{ d[1].bukti }}</p>
                  </td>
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
import Modals from "@/components/Modals.vue";
import moment from "moment";
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
      fullDataBulanan: [],
    };
  },
  mounted() {
    this.loadedData();
  },
  methods: {
    getTgl() {
      console.log(this.tanggal);
    },

    // Status Method
      CekStatus(value){
        if(value === 'pemasukan'){
          return value
        } else {
          return value
        }
      },

      // Change Tanggal
      GantiTgl(value){
return moment(value, 'YYYY-MM-DD').format('Do MMMM YYYY')
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
      await axios
        .get("administration/administrationdetail/", {
          params: {
            year: "2021",
            month: moment().month(this.$route.params.bulan).format("M"),
          },
        })
        .then((res) => {
          let dataDetail;
          // let dataDetailTemp

          dataDetail = new Array(res.data);
          // dataDetailTemp = new Array(dataDetail[0][0])
          const hasil = Object.keys(dataDetail[0]).map((key) => [
            Number(key),
            dataDetail[0][key],
          ]);
          // for (let i = 0; i <= hasil.length - 1; i++) {
          //   if(dataDetail[0][i] !== undefined ){
          //   }

          this.fullDataBulanan = hasil;
          // }
          console.log(this.fullDataBulanan);
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
