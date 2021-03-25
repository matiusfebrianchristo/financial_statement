<template>
    <div class="sidebar">
      <div class="d-lg-none button-close-mobile d-sm-block">
        <div class="wrapper-nav" @click="onClick" >
          <div class="circle icon" :class="{ close: isActive === false }">
            <span class="line top"></span>
            <span class="line middle"></span>
            <span class="line bottom"></span>
          </div>
        </div>
      </div>
      <!-- <div class="sidebar-title d-flex justify-content-center align-items-center">
      <h5><strong> Laporan Keuangan </strong></h5>
    </div> -->
      
      <div
        class="sidebar-header d-flex justify-content-center align-items-left px-3 py-4"
      >
        <img
          class="rounded-pill img-fluid"
          width="65"
          src="../assets/image/user4.png"
          alt=""
        />
        <div class="ms-2">
          <h5 class="fs-6 mb-0">
            <a class="text-decoration-none" @click.prevent href=""
              >Halo, <strong>Admin</strong>.</a
            >
          </h5>
          <!-- <button
          v-if="progress === true"
          class="mt-3 mb-0 btn-logout-custom"
          type="button"
          disabled
        >
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Loading...</span>
        </button> -->
          <button
            data-bs-toggle="modal"
            data-bs-target="#modalLogout"
            class="mt-3 mb-0 btn-logout-custom"
          >
            <i class="bi bi-box-arrow-right"></i> Keluar
          </button>
        </div>
      </div>

      <hr />
      <div class="menu-items">
        <router-link
          to="/dashboard"
          active-class="active"
          exact
          tag="button"
          class="side-btn"
        >
          <div class="link-container">
            <i class="bi bi-house"></i> <span>Dashboard</span>
          </div>
        </router-link>
        <router-link
          to="/laporan_keuangan"
          active-class="active"
          tag="button"
          class="side-btn"
        >
          <div class="link-container">
            <i class="bi bi-journal-text"></i> <span>Laporan Keuangan</span>
          </div>
        </router-link>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "Sidebar",
  computed:{
    ...mapState({
      isActive: state => state.isMNavActive
    })
  },
  methods: {
    ...mapActions(['isMNavActive']),
    onClick() {
      this.isMNavActive();
      console.log(this.isActive)
    },
    
  },
};
</script>

<style>
.btn-logout-custom {
  width: 90px;
  height: 30px;
  margin: 0 30px;
  text-decoration: none;
  border: 1px solid rgb(237, 33, 26);
  border-radius: 10px;
  transition: .5s ease-in-out;
  font-weight: 500;
  font-family: "Times New Roman", Times, serif;
  background-color: rgba(245, 70, 64, 0.7);
  color: rgb(255, 255, 255) !important;
}

.btn-logout-custom:hover{
  background-color: rgba(245, 6, 34, 0.76);
}

.sidebar-title {
  height: 65px;
  background-color: #2ec2b8;
}

.sidebar .sidebar-header h5 a {
  color: #d1d5db;
}

.sidebar .sidebar-header p {
  color: #9ca3af;
  font-size: 0.825rem;
}
.link-container i {
  margin-left: 30px;
}
.link-container span {
  color: var(--dk-gray-300);
  margin-left: 10px;
}

.menu-items {
  display: flex;
  flex-direction: column;
  margin-top: 35px;

  /* padding: 0px 10px; */
}

.menu-items > * {
  margin-top: 10px;
  text-align: left;
  text-shadow: 1px 1px 4px black;
  /* border-radius: 20px; */
}

.side-btn.active {
  background-color: #3bd1c7;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  border-left: 3px solid white;
  font-weight: bold;
}

.side-btn.active .link-container span {
  color: white;
}

.side-btn:focus {
  outline: none;
}

.side-btn {
  border: none;
  padding: 10px 0px;
  cursor: pointer;
  font-size: 16px;
  color: white;
  background: none;
}

/* ====================== */
/* close button mobile */

.button-close-mobile {
  position: absolute!important;
  z-index: 99999;
  margin-top: 10px;
  margin-left: 220px;
}

.button-close-mobile .wrapper-nav {
  /* background: rgba(30, 30, 30, 0.9); */
  display: inline-block;
  /* border: 1px solid rgba(30, 30, 30, 0.9); */
  border-radius: 500px;
  transition: .3s ease-in-out;
  visibility: visible;
  margin-left: 20px;
  position: relative;
  padding: 9px;
  cursor: pointer;
}

</style>

