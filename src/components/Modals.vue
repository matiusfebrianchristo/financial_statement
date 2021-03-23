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
              <p v-if="isEdit === true" class="text-danger">
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
            v-if="onProgress === true"
            class="btn btn-primary btn-lg btn-block "
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
            v-if="isEdit === false"
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

export default {
  name: "Modals",
  props: ["isEdit", "dataEdited", "cekImg", "isDone", "onProgress"],
  components: {
    DatePicker,
  },
  data() {
    return {
      nominal: null,
      status: null,
      created_at: moment().format("YYYY-MM-DD"),
      deskripsi: "",
      bukti: "",
      id: null,
      data: new FormData(),
    };
  },
  watch: {
    isDone: function (newValue, oldValue) {
      console.log(newValue, oldValue);
      if (newValue === true) {
        this.$refs.Close.click();
      }
    },
  },
  methods: {
    clearInput() {
      this.nominal = null;
      this.status = null;
      this.created_at = moment().format("YYYY-MM-DD");
      this.deskripsi = "";
      this.id = null;
      this.$refs.fileupload.value = null;
    },

    getStatus(value) {
      if (value != null) {
        this.status = value.toLowerCase();
      }
      console.log(this.status);
    },
    isEdited(value) {
      console.log(value);
      this.cek = false;
      this.id = value.administration_id;
      this.nominal = value.nominal;
      this.status = value.tipe;
      this.created_at = moment(value.created_at, "YYYY-M-D").format(
        "YYYY-MM-DD"
      );
      this.deskripsi = value.deskripsi;
      this.bukti = value.bukti;
    },
    cekData() {
      console.log(this.cekImg);
      if (this.cekImg !== true) {
        if (this.isEdit !== true) {
          return {
            nominal: this.nominal,
            tipe: this.status,
            deskripsi: this.deskripsi,
            created_at: this.created_at,
          };
        } else {
          return {
            nominal: this.nominal,
            tipe: this.status,
            deskripsi: this.deskripsi,
            created_at: this.created_at,
          };
        }
      } else {
        return this.data;
      }
    },
    // onClickSv() {
    //   this.data.append("tipe", this.status);
    //   this.data.append("nominal", this.nominal);
    //   this.data.append("bukti", this.bukti);
    //   this.data.append("deskripsi", this.deskripsi);
    //   this.data.append("created_at", this.created_at);
    // },
    imageUpload(event) {
      this.$emit("cekImg");
      console.log(event.target.files[0]);
      this.data.append("tipe", this.status);
      this.data.append("nominal", this.nominal);
      this.data.append("bukti", event.target.files[0]);
      this.data.append("deskripsi", this.deskripsi);
      this.data.append("created_at", this.created_at);
    },

    onClick() {
      this.$emit("clicked", this.cekData());
    },
    onClickSvData() {
      this.$emit("clickedSv", this.cekData());
    },
  },
};
</script>

<style>
</style>