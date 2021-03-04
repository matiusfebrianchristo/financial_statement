<template>
  <div class="content">
    <!-- ==================================================================== -->
    <!-- Header -->
    <div class="content wrapper" :class="{ full: isNav }">
      <div class="title-page text-center mt-4">
        <div class="light-mode content-header rounded m-md-5 p-1">
          <div class="row row-cols-5">
            <div class="col">
              <i
                @click="$router.go(-1)"
                class="bi bi-arrow-left back-arrow"
              ></i>
            </div>
            <div class="col"></div>
            <div class="col">
              <h2>
                <strong
                  >{{ this.$route.params.bulan }} {{ this.$route.params.tahun }}
                </strong>
              </h2>
            </div>
            <div class="col"></div>
            <div class="col"></div>
          </div>
          <hr />
          <p>
            Data laporan keuangan pada bulan
            {{ this.$route.params.bulan }} tahun {{ this.$route.params.tahun }}.
          </p>
        </div>
      </div>

      <!-- Button Add -->
      <!-- Modals Add -->
      <div class="mx-md-5 mt-5 mb-0 clearfix">
        <button
          type="button"
          class="btn btn-success float-end"
          @click="clickAddTrans"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Tambah Transaksi
        </button>
      </div>

      <!-- ====================================================================================== -->
      <!-- Modal -->

      <Modals
        @clicked="addTransaksi"
        @cekImg="rubahModeImg"
        @clickedSv="saveDataEdit"
        ref="editButton"
        :cekImg="cek"
        :isEdit="isEdited"
        :dataEdited="dataEdit"
      />

      <!-- Akhir Button Add -->

      <!-- ============================================================================================= -->
      <!-- Content -->

      <!-- Table -->
      <div class="m-md-5 m-3">
        <div class="row bg-table shadow-lg rounded">
          <div class="col pt-3 table-responsive">
            <table class="table text-center">
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
                <tr v-for="(d, index) in getDataBulanan()" :key="d.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td class="text-wrapper text-start">
                    Rp. {{ d[1].nominal }}
                    <!-- <span v-if="dataBaru == true" class="badge bg-secondary"> New</span> -->
                  </td>
                  <td class="text-wrapper">
                    <p class="text-light" :class="CekStatus(d[1].tipe)">
                      {{ d[1].tipe }}
                    </p>
                  </td>
                  <td class="text-wrapper">{{ GantiTgl(d[1].created_at) }}</td>
                  <td class="text-wrapper">{{ d[1].deskripsi }}</td>
                  <td class="text-wrapper">
                    <a
                      v-if="d[1].bukti !== 'None'"
                      class="link-primary"
                      :href="`https://glacial-coast-08306.herokuapp.com${d[1].bukti}`"
                      target="_blank"
                      >{{ getImgName(d[1].bukti) }}</a
                    >
                    <p v-else>Tidak ada bukti</p>
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
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            @click.prevent="
                              editData(
                                d[0],
                                d[1].nominal,
                                d[1].tipe,
                                d[1].created_at,
                                d[1].deskripsi,
                                d[1].bukti
                              )
                            "
                            ><i class="bi bi-pencil-square"></i> Edit</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href=""
                            @click.prevent="deleteData(d[0])"
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
      // For edited Data
      isEdited: false,
      dataBaru: false,
      dataEdit: null,
      isActiveNav: false,
      income: [],
      id: null,
      cek: false,
      outcome: [],
      profit: [],
      oldFullDataBulanan: null,
      fullDataBulanan: null,
      sortedDataBulanan: [],
    };
  },
  mounted() {
    this.loadedData();
  },
  methods: {
    rubahModeImg(){
      this.cek = true
    },
    getTgl() {
      console.log(this.tanggal);
    },

    // =================
    clickAddTrans() {
      this.isEdited = false;
    },

    // ============================
    // Get Data Bulaanan
    getDataBulanan() {
      if (this.fullDataBulanan !== null) {
        const sorted = this.fullDataBulanan.slice();
        const dataSorted = sorted.sort((a, b) => {
          return new Date(b[1].created_at) - new Date(a[1].created_at);
        });
        return dataSorted;
      }
    },

    // cekBaruDitambahkan(value) {
    //   if(this.oldFullDataBulanan !== null ){
    //     const fild = this.oldFullDataBulanan.slice();
    //     const dataFilter = fild.filter((data) => {
    //       return data[0] == value
    //     })
    //     if(dataFilter.length !== 0){
    //       this.dataBaru = false
    //     } else {
    //       this.dataBaru = true
    //     }
    //   }

    // },

    // Status Method
    CekStatus(value) {
      if (value === "pemasukan") {
        return value;
      } else {
        return value;
      }
    },
    // Get image name
    getImgName(value) {
      let str = value.split("/").slice(-1).join(" ");
      return str;
    },

    // Change Tanggal
    GantiTgl(value) {
      return moment(value, "YYYY-MM-DD").format("Do MMMM YYYY");
    },
    // Hide Sidebar opsi
    clickedToggle() {
      if (this.isActiveNav === true) {
        this.isActiveNav = false;
      } else {
        this.isActiveNav = true;
      }
    },

    // ===================================================
    // Edit data Detail Bulanan
    async saveDataEdit(value) {
      console.log(value);

      if (
        value.nominal !== null &&
        value.status !== null &&
        value.created_at !== null &&
        value.deskripsi !== null
      ) {
        console.log(value);
        // alert("Ok")
        await axios
          .patch(`administration/updateadministration/${this.id}/`, value)
          .then(async () => {
            this.$refs.editButton.clearInput()
            
            await this.loadedData();

            this.$toast.success("Data berhasil di Edit!", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
              this.cek = false;
              this.isEdited = false;
          })
          .catch((err) => console.log(err));
      } else {
        this.$toast.error("Lengkapi Data!!", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });

        if (this.cek === true && this.isEdited === true) {
          this.cek = false;
          this.isEdited = false;
        }
      }
    },

    // Add Laporan Keuangan
    async addTransaksi(value) {
      if (
        value.nominal !== null &&
        value.status !== null &&
        value.created_at !== null &&
        value.deskripsi !== null
      ) {
        await axios
          .post(`administration/addadministration/`, value)
          .then(async () => {
            this.$refs.editButton.clearInput()
            await this.loadedData();

            this.$toast.success("Data berhasil ditambahkan!", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
            
              this.cek = false;
            

            

            // Set timeout for location reload
            // setTimeout(function () {
            //   location.reload();
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
    // ==============================================
    // Edit data bulanan
    editData(id, nominal, status, tanggal, deskripsi, bukti) {
      this.isEdited = true;
      this.id = id
      const data = {
        nominal: nominal,
        tipe: status,
        created_at: tanggal,
        deskripsi: deskripsi,
        bukti: bukti,
      };

      this.$refs.editButton.isEdited(data);
    },

    // ==============================================
    // Delete Data Bulanan
    deleteData(value) {
      // console.log(value)
      axios
        .delete(
          `https://glacial-coast-08306.herokuapp.com/api/v1/administration/deleteadministration/?administration_id=${value}`
        )
        .then(async () => {
          await this.loadedData();

          this.$toast.success("Data berhasil dihapus!", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        })
        .catch((err) => console.log(err));
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
          if (this.fullDataBulanan !== null) {
            if (this.oldFullDataBulanan === null) {
              this.oldFullDataBulanan = this.fullDataBulanan;
            }

            this.fullDataBulanan = [];
            let dataDetail;

            dataDetail = new Array(res.data);

            const hasil = Object.keys(dataDetail[0]).map((key) => [
              Number(key),
              dataDetail[0][key],
            ]);

            this.fullDataBulanan = hasil;
          } else {
            this.fullDataBulanan = [];

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
          }

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

.text-wrapper {
  word-wrap: break-word;
  min-width: 160px;
  max-width: 160px;
}

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
