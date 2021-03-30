<script>
import { Line } from "vue-chartjs";
import moment from "moment";

import { mapGetters, mapState } from "vuex";

export default {
  extends: Line,

  computed: {
    ...mapState(["graphic"]),
    ...mapGetters(['allResultTahunan'])
  },
  watch:{
    graphic: function(newValue){
      if(newValue){
          this.renderChart(this.graphic.data, this.graphic.option);
      }
    },
  },
  data() {
    return {
          dataset: {
            title: "Laporan Keuangan",
            labels: moment.months(),
            datasets: [
              {
                label: "In",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                borderColor: "rgba(0, 255, 0, 0.8)",
                pointBackgroundColor: "green",
                borderWidth: 2,
                pointBorderColor: "green",
                fill: false,
                data: 0,
              },
              {
                label: "Out",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                borderColor: "rgba(255, 0, 0, 0.8)",
                pointBackgroundColor: "red",
                borderWidth: 2,
                pointBorderColor: "red",
                fill: false,
                data: 0,
              },
              {
                label: "Untung",
                backgroundColor: "rgba(0, 0, 255, 0.2)",
                borderColor: "rgba(0, 0, 255, 0.7)",
                pointBackgroundColor: "blue",
                borderWidth: 2,
                pointBorderColor: "blue",
                fill: false,
                data: 0,
              },
            ],
          },
          chartOption: {
            title: {
              display: true,
              text: "Laporan Keuangan",
              fontColor: "grey",
            },
            legend: {
              labels: {
                fontColor: "grey",
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontColor: "grey",
                    suggestedMin: -400000,
                    suggestedMax: 500000,
                    beginAtZero: true,
                    steps: 10,
                    stepValue: 1,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Jumlah",
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    fontColor: "grey",
                  },
                },
              ],
            },
            responsive: true,
            maintainAspectRatio: false,
          },
    }
  },
  mounted() {
    if(this.graphic === null){

      this.renderChart(this.dataset, this.chartOption);
    } else {
      this.renderChart(this.graphic.data, this.graphic.option);
    }
  },
};
</script>