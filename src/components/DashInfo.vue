<template>
  <div class="bg-grey text-dark container-fluid">
    <section id="minimal-statistics">
      <div class="row">
        <div class="col-12 mt-3 mb-1">
          <h4 class="text-uppercase">
            Rekap hasil data laporan Keuangan tahun ini
          </h4>
          <p>Hasil rekap data tahun ini.</p>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-lg-4 col-md-4 col-12">
          <div class="card card-income">
            <div class="card-content">
              <div class="card-body">
                <div class="d-flex d-flex justify-content-between">
                  <div class="align-self-center">
                    <i
                      style="font-size: 50px"
                      class="text-success bi bi-journal-text"
                    ></i>
                  </div>
                  <div class="text-end">
                    <h3>{{ formatPrice(allResultTahunan.income) }}</h3>
                    <span class="text-success"
                      ><i class="bi bi-arrow-up"></i> Income
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-12">
          <div class="card card-outcome">
            <div class="card-content">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="align-self-center">
                    <i
                      style="font-size: 50px"
                      class="bi bi-journal-text text-danger float-start"
                    ></i>
                  </div>
                  <div class="text-end">
                    <h3>{{ formatPrice(allResultTahunan.outcome) }}</h3>
                    <span class="text-danger"
                      ><i class="bi bi-arrow-down"></i> Outcome</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-12">
          <div class="card card-profit">
            <div class="card-content">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="align-self-center">
                    <i
                      style="font-size: 50px"
                      class="bi bi-journal-text text-primary float-start"
                    ></i>
                  </div>
                  <div class="text-end">
                    <h3>{{ formatPrice(allResultTahunan.profit) }}</h3>
                    <span class="text-primary"
                      ><i class="text-primary bi bi-arrow-down-up"></i>
                      Profit</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DashInfo",
  computed: {
    ...mapGetters(["allResultTahunan"]),
  },

  methods: {
    formatPrice(value) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      });

      return formatter.format(value)
    },
  },
};
</script>

<style>
</style>