<template>
  <div class="navbar-customize">
    <nav
      class="navbar wrapper navbar-expand-lg navbar-dark"
      :class="{ full: isActive }"
    >
      <div class="container-fluid">
        <div class="d-none button-close d-lg-block">
          <div class="wrapper-nav" @click="onClick">
            <div class="circle icon" :class="{ close: isActive === false }">
              <span class="line top"></span>
              <span class="line middle"></span>
              <span class="line bottom"></span>
            </div>
          </div>
        </div>
        <div class="d-lg-none button-close d-sm-block">
        <div class="wrapper-nav" @click="onClickMobile" :class="{ close: isMActive === false }">
          <div class="circle icon" >
            <span class="line top"></span>
            <span class="line middle"></span>
            <span class="line bottom"></span>
          </div>
        </div>
      </div>
        <!-- <router-link
          class="navbar-brand dash-p"
          :class="{ show: isActive === true }"
          to="/"
          ><strong>Dashboard</strong></router-link
        > -->
        <!-- <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <!-- <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <transition name="fade">
    <img v-if="isActive" src="../assets/image/user4.png" alt="asd" class="img-svg ">
  </transition>
            </li>
            <li class="nav-item d-lg-none d-sm-block">
              <Sidebar />
            </li>
          </ul>
        </div> -->
      </div>
    </nav>
  </div>
</template>

<script>
// import Sidebar from "@/components/Sidebar.vue";

export default {
  props: ["isActive", "isMActive"],
  components: {
    // Sidebar,
  },
  data() {
    return {
      isActiveNav: this.isActive,
    };
  },
  methods: {
    onClick() {
      this.$emit("clicked");
    },
    onClickMobile(){
      this.$emit("clickedMobile")
    }
  },
};
</script>

<style>


@media (min-width: 992px) {
}
.dash-p {
  margin-left: 50px;
  transform: translateX(-200px);
  transition: 0.3s ease-in-out;
}

.dash-p.show {
  transform: translateY(0);
}

.navbar {
  right: auto !important;
  left: 0 !important;
  background-color: var(--sidebar-bg-color) !important;
}

/* .button-close {
  margin-right: 20px;
  width: 50px;
  text-align: center;
  background-color: rgba(30, 30, 30, 0.5);
  font-size: 25px;
  padding: 5px;
  border: 1px solid grey;
} */

.bg-custom {
  box-shadow: 0px 5px 2px rgba(0, 0, 0, 0.5);
}

/* Image profile */
.img-svg {
  width: 50px;
  margin-right: 40px;
  cursor: pointer;
}

.nav-item {
  visibility: visible;
  transition: 0.5s;
}

.nav-item.hidepic {
  visibility: hidden;
}


/* =================================== */
/* Button Close Mobile */

.wrapper-nav.close{
    visibility: hidden;
}
</style>