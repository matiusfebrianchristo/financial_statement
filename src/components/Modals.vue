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
          <h5 class="modal-title" id="exampleModalLabel">Tambah Transaksi</h5>
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
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="status"
              >
                <option value="none" selected>Status</option>
                <option value="pemasukan">Input</option>
                <option value="pengeluaran">Output</option>
              </select>
            </div>

            <!-- Untuk Tanggal -->
            <div class="mb-3">
              <label for="tanggal" class="form-label">Tanggal</label>
              <date-picker
                class="form-control"
                id="tanggal"
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
                @change="imageUpload"
                id="formFile"
                accept="image/*"
              />
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
          <button type="button" class="btn btn-primary" @click="onClick">
            Add
          </button>
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
  components: {
    DatePicker,
  },
  data() {
    return {
      nominal: null,
      status: "none",
      created_at: moment().format("YYYY-MM-DD"),
      deskripsi: "",
      bukti: null,
      data: new FormData(),
    };
  },
  methods: {
    imageUpload(event) {
      this.data.append("tipe", this.status);
      this.data.append("nominal", this.nominal);
      this.data.append(
        "bukti", event.target.files[0]);
      this.data.append("deskripsi", this.deskripsi);
      this.data.append("created_at", this.created_at);
    },

    onClick() {
      this.$emit("clicked", this.data);
    },
  },
};
</script>

<style>
</style>