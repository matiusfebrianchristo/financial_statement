<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
import { mapState } from "vuex"


export default {
  extends: Line,
  mixins: [ reactiveProp ],
  computed:{
    ...mapState(['graphic'])
  },
  mounted(){
      this.renderChart(this.graphic.data, this.graphic.option)
  }
}
</script>