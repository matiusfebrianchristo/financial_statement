<template>
  <div class="container"></div>
</template>

<script>
// import PieChart from "@/components/PieChart.vue";
import axios from "axios";

export default {
  name: "Tes",
  components: {
    // PieChart,
  },
  data() {
    return {};
  },
  mounted(){
    this.getDataBaru()
  },
  methods: {
    async getDataBaru() {
      await axios
        .get("administration/listadministration/")
        .then((res) => {
          const data = res.data;

          data.sort((a, b) => {
            return parseFloat(a.id) - parseFloat(b.id)
          })

          console.log(data.slice(-5))

        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.grey-bg {
  background-color: #f5f7fa;
}
/* .card-income {
  font-weight: 600;
  color: rgb(30, 196, 8);
  background-color: rgb(164, 255, 164)!important;
}
.card-outcome {
  font-weight: 600;
  background: linear-gradient(
    195deg,
    rgba(255, 0, 24, 0.6) 0%,
    rgba(248, 46, 35, 0.5) 50%,
    rgba(240, 85, 77, 0.5) 100%
  );
} */
</style>