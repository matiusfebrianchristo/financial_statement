<template>
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
            <strong>Tambah Transaksi</strong>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form enctype="multipart/form-data">
            <!-- Untuk nominal -->
            <label for="nominal" class="form-label">Nominal</label>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Rp. </span>
              <input
                type="number"
                class="form-control"
                v-model="nominal"
                id="nominal"
                placeholder="nominal..."
              />

              <!-- Untuk Status -->
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Status</label>
              <v-select
                v-model="status"
                @input="getStatus"
                :options="['Pemasukan', 'Pengeluaran']"
              ></v-select>
            </div>

            <!-- Untuk Tanggal -->
            <div class="mb-3">
              <label for="tanggal" class="form-label">Tanggal</label>
              <date-picker
                class="form-primary w-100"
                v-model="created_at"
                format="DD-MM-YYYY"
                valueType="YYYY-MM-DD"
              ></date-picker>
            </div>

            <!-- Untuk Deskripsi -->
            <div class="mb-3">
              <label for="deskripsi" class="form-label">Deskripsi</label>
              <textarea
                class="form-control"
                v-model="deskripsi"
                id="Deskripsi"
                rows="3"
                placeholder="Isi deskripsi..."
              ></textarea>
            </div>

            <!-- Untuk Bukti / File foto -->
            <div class="mb-3">
              <label for="formFile" class="form-label">Bukti</label>
              <input
                class="form-control"
                type="file"
                ref="fileupload"
                @change="imageUpload"
                id="formFile"
                accept="image/*"
              />
              <p v-if="isAction === 'edit'" class="text-danger">
                *Isi field ini jika ingin menganti gambar!
              </p>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            ref="Close"
            style="visibility: hidden"
            type="button"
            data-bs-dismiss="modal"
          ></button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            v-if="progress === true"
            class="btn btn-primary btn-lg btn-block"
            type="button"
            disabled
          >
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </button>
          <div v-else>
            <button
              v-if="isAction === 'add'"
              type="button"
              class="btn btn-primary"
              id="btnModalsSv"
              @click="onClick"
            >
              Add
            </button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              id="btnModalsAdd"
              @click="onClickSvData"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import moment from "moment";
import { mapActions, mapState } from "vuex";

export default {
  name: "Modals",
  components: {
    DatePicker,
  },
  data() {
    return {
      nominal: null,
      status: null,
      created_at: moment().format("YYYY-MM-DD"),
      deskripsi: null,
      bukti: null,
      id: null,
      cekImg: false,
      progress: false,
      data: new FormData(),
    };
  },
  computed: {
    ...mapState(["isAction", "tempTransaksi"]),
  },
  watch: {
    // Ketika isAction = add bersihkan semua data inputan
    isAction(newValue) {
      if (newValue) {
        if (newValue === "add") {
          this.clearInput();
        }
      }
    },

    // Ketika tempTransaksi diisi akan otomatis ditambahkan ke Data()
    tempTransaksi(newValue) {
      if (newValue) {
        if (this.isAction === "edit") {
          if (this.tempTransaksi !== null) {
            this.id = this.tempTransaksi.id;
            this.nominal = this.tempTransaksi.nominal;
            this.status = this.tempTransaksi.tipe;
            this.created_at = moment(
              this.tempTransaksi.created_at,
              "YYYY-M-D"
            ).format("YYYY-MM-DD");
            this.deskripsi = this.tempTransaksi.deskripsi;
            this.bukti = this.tempTransaksi.bukti;
          }
        }
      }
    },
  },
  methods: {
    ...mapActions([
      "addTransaksi",
      "dataBulanIni",
      "saveTransaksi",
      "getDataTahunIni",
    ]),

    // Clear Form
    clearInput() {
      this.nominal = null;
      this.status = null;
      this.created_at = moment().format("YYYY-MM-DD");
      this.deskripsi = null;
      this.id = null;
      this.$refs.fileupload.value = null;
    },

    // Untuk value Select form Status
    getStatus(value) {
      if (value != null) {
        this.status = value.toLowerCase();
      }
      console.log(this.status);
    },

    // Apakah Data edit/add dan dengan gambar/tidak
    cekData() {
      console.log(this.cekImg);
      // Untuk Add atau edit tanpa Gambar ============>
      if (this.cekImg !== true) {
        // Untuk Add Data Tanpa Gambar ======================>
          this.progress = true;
        if (this.isAction !== "edit") {

          const data = {
            nominal: this.nominal,
            tipe: this.status,
            deskripsi: this.deskripsi,
            created_at: this.created_at,
          };

          this.addTransaksi({
            obj: data,
            isImg: false,
          })
            .then(() => {
              this.getDataTahunIni();
              this.progress = false;
              if (
                this.$route.params.tahun !== undefined &&
                this.$route.params.bulan !== undefined
              ) {
                this.dataBulanIni({
                  params: {
                    year: this.$route.params.tahun,
                    month: moment().month(this.$route.params.bulan).format("M"),
                  },
                });
              }
              localStorage.setItem("tambah_transaksi", false);

              this.$toast.success("Data berhasil ditambahkan!", {
                type: "success",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });

              this.$refs.Close.click();
              this.clearInput();
            })
            .catch((err) => {
              console.log(err);
               
              this.progress = false;
              this.$toast.error("Terjadi kesalahan", {
                type: "error",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
            });
        }
        // Untuk Edit Data ===================>
        else {
          const data = {
            id: this.id,
            data: {
              nominal: this.nominal,
              tipe: this.status,
              deskripsi: this.deskripsi,
              created_at: this.created_at,
            },
          };
          this.saveTransaksi(data)
            .then(() => {
              if (
                this.$route.params.tahun !== undefined &&
                this.$route.params.bulan !== undefined
              ) {
                this.dataBulanIni({
                  params: {
                    year: this.$route.params.tahun,
                    month: moment().month(this.$route.params.bulan).format("M"),
                  },
                });
              }
              
              this.progress = false;
              this.$toast.success("Data berhasil di Edit!", {
                type: "success",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
              this.$refs.Close.click();
              this.clearInput();
            })
            .catch(() => {
              this.$toast.error("Lengkapi Data!!", {
                type: "error",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
            });
        }
      }

      // Untuk Add/Edit Data dengan Gambar ==============>
      else {
        this.progress = true;
        // Untuk Add
        if (this.isAction === "add") {
          this.addTransaksi({
            obj: this.data,
            isImg: true,
          })
            .then(() => {
              this.progress = false;
              this.getDataTahunIni();
              if (
                this.$route.params.tahun !== undefined &&
                this.$route.params.bulan !== undefined
              ) {
                this.dataBulanIni({
                  params: {
                    year: this.$route.params.tahun,
                    month: moment().month(this.$route.params.bulan).format("M"),
                  },
                });
              }
              localStorage.setItem("tambah_transaksi", false);
              this.$toast.success("Data berhasil ditambahkan!", {
                type: "success",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
              this.$refs.Close.click();
              this.clearInput();
            })
            .catch((err) => console.log(err));
        }
        // Untuk Save
        else {
          const data = {
            id: this.id,
            data: this.data,
          };
          this.saveTransaksi(data)
            .then(() => {
              this.progress = false;
              this.$toast.success("Data berhasil di Edit!", {
                type: "success",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
              this.$refs.Close.click();
              this.clearInput();
            })
            .catch(() => {
              this.$toast.error("Lengkapi Data!!", {
                type: "error",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
            });
        }
      }
    },

    // Untuk Upload Gambar
    imageUpload(event) {
      this.cekImg = true;
      console.log(event.target.files[0]);
      this.data.append("tipe", this.status);
      this.data.append("nominal", this.nominal);
      this.data.append("bukti", event.target.files[0]);
      this.data.append("deskripsi", this.deskripsi);
      this.data.append("created_at", this.created_at);
    },

    // Click Add
    onClick() {
      if (
        this.status !== null &&
        this.deskripsi !== null &&
        this.nominal !== null &&
        this.created_at !== null
      ) {
        this.cekData();
      } else {
        this.$toast.error("Lengkapi Data!!", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },

    // Click Save
    onClickSvData() {
      if (
        this.status !== null &&
        this.deskripsi !== null &&
        this.nominal !== null &&
        this.created_at !== null
      ) {
        this.cekData();
      } else {
        this.$toast.error("Lengkapi Data!!", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
};
</script>

<style>
</style>