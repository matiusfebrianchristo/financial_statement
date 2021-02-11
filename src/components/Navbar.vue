<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-custom">
  <div class="container-fluid">
    <!-- <div class="d-none button-close d-md-block">
      <i @click="clicked" class="bi bi-justify"></i>
    </div> -->
    <router-link class="navbar-brand" to="/"><strong>Dashboard</strong></router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <ul class="navbar-nav me-auto justify-content-end mb-2 mb-lg-0">
        <li class="nav-item d-lg-none d-sm-block">
          <Sidebar />
        </li>
        
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
    // props: ['isActive'],
    components: {
      Sidebar
    },
    methods:{
      clicked(){
        // if(this.isActive === 'active'){
        //   this.isActive = 'not-active';
        //   console.log(this.isActive)
        // } else {
        //   this.isActive = 'active';
        //   console.log(this.isActive)
        // }
        this.$emit('clicked')
      },
    },
    watch:{
      isActive: function (newVAl, oldVal) {
        console.log(`New : ${newVAl}, old: ${oldVal}`)
      }
    }

}
</script>

<style>
    

    .button-close{
      margin-right: 20px ;
      width: 50px;
      text-align: center;
      background-color: rgba( 30, 30, 30, 0.5);
      font-size: 25px;
      /* padding: 5px; */
      border: 1px solid grey;
    }

    .bg-custom{
        box-shadow: 0px 5px 2px rgba(0, 0, 0, 0.5);
    }
</style>