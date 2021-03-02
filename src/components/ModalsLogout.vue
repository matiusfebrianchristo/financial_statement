<template>
  <div class="modals">
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="modalLogout"
      tabindex="-1"
      aria-labelledby="modalLogout"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLogout">
              <span class="text-danger"
                ><strong>
                  <i class="bi bi-exclamation-triangle icon-logout"></i>
                  PERINGATAN</strong
                >
              </span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body modal-body-logout">
            <p>
              Keluar akan menghapus semua data sesion anda dan diperlukan login
              kembali untuk membuka dashboard.
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Batal
            </button>
            <button
              v-if="progress === true"
              class="btn btn-danger"
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
            <button
              v-else
              type="button"
              class="btn btn-danger"
              @click.prevent="clickLogout"
              data-bs-dismiss="modal"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalLogout",
  data() {
    return {
      progress: false,
    };
  },
  methods: {
    clickLogout() {
      localStorage.removeItem("token_access");
      localStorage.removeItem("token_refresh");
        this.$router.push("/masuk")
    },
  },
};
</script>

<style>
.modals {
  color: black;
}
.icon-logout {
  font-size: 30px !important;
}
.modal-body-logout p {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>