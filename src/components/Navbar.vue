<template>
  <div class="navbar-customize">
    <nav
      class="navbar wrapper navbar-expand-lg navbar-dark "
      :class="{ full: isActiveNav }"
    >
      <div class="container-fluid">
        <div class="d-none button-close d-lg-block">
          <div class="wrapper-nav" @click="onClick">
            <div class="circle icon" :class="{ close: isActiveNav === false }">
              <span class="line top"></span>
              <span class="line middle"></span>
              <span class="line bottom"></span>
            </div>
          </div>
        </div>
        <div class="d-lg-none button-close d-sm-block">
          <div
            class="wrapper-nav"
            @click="onClickMobile"
            
          >
            <div class="circle icon" :class="{ close: isActiveNavMobile === false }">
              <span class="line top"></span>
              <span class="line middle"></span>
              <span class="line bottom"></span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {
    // Sidebar,
  },
  computed: {
    ...mapState({
      isActiveNav: state => state.isNavActive,
      isActiveNavMobile: state => state.isMNavActive
    }),
  },
  data() {
    return{
      
    }
  },
  methods: {
    ...mapActions(["isNavActive", "isMNavActive"]),

    onClick() {
      this.isNavActive();
    },
    onClickMobile() {
      this.isMNavActive();
    },
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

.wrapper-nav.close {
  visibility: hidden;
}
</style>