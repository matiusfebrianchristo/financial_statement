<template>
  <div class="sidebar">

      <div class="row row-cols-5 text-center  mb-2 m-4">
          <div class="col-12  text-center">
              <h4><strong>Media</strong></h4>
          </div>
          <div class="col">
              <i class="bi bi-facebook"></i>
          </div>
          <div class="col">
              <i class="bi bi-envelope-fill"></i>
          </div>
          <div class="col">
              <i class="bi bi-globe2"></i>
          </div>
          <div class="col">
              <i class="bi bi-youtube"></i>
          </div>
          <div class="col">
              <i class="bi bi-instagram"></i>
          </div>
      </div>

      <div class="menu-items">
          <router-link to="/" active-class="active" exact tag="button" class="side-btn">
            <div class="link-container">
                Laporan Keuangan
            </div>
          </router-link>
          <router-link to="/detail_bulanan" active-class="active" exact tag="button" class="side-btn">
            <div class="link-container">
                About
            </div>
          </router-link>

      </div>
  </div>
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>

<style>


    .menu-items {
        display: flex;
        flex-direction: column;
        margin-top: 35px;
        
        /* padding: 0px 10px; */
        
    }

    .menu-items > * {
        margin-top: 10px;
        text-shadow: 2px 2px 4px black;
        /* border-radius: 20px; */
    }

    .side-btn:focus{
        outline: none;
    }

    .side-btn.active{
        /* background-color: white; */
        background-image: linear-gradient(to right, #00F260 , #0575E6);
        color: white;
        font-weight: bold;
        transition: .5s;
        /* border-right: 5px solid black; */
    }

    .side-btn{
        border: none;
        padding: 10px 0px;
        cursor: pointer;
        font-size: 16px;
        color: white;
        background: none;
    }
</style>

