<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-custom">
  <div class="container-fluid">
    
    <router-link class="navbar-brand dash-p" :class="{ show :  isActive === true }" to="/"><strong>Dashboard</strong></router-link>
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
    <div class="ml-auto d-none button-close d-lg-block">
      <i @click="onClick" class="bi bi-justify"></i>
    </div>
  </div>
</nav>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
    props: ['isActive'],
    components: {
      Sidebar
    },
    data(){
      return {
        isActiveNav : this.isActive
      }
    },
    methods:{
      onClick(){
        this.$emit('clicked')
      },
    },


}
</script>

<style>

    .dash-p{
        transform: translateX(-250px);
        transition: .3s ease-in-out;
    }

    .dash-p.show{
        transform: translateY(0);
    }
    
    .navbar{
      right: auto !important;
      left: 0 !important;
      background-color: #252636 !important;
    }

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