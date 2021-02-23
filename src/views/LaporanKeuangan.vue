<template>
  <div class="content">
    <!-- Sidebar -->
    <transition name="slide-fade">
      <div
        class="d-lg-block d-none fixed sidebar bg-custom"
        :class="{ hide: isActiveNav, show: isMNavActive }"
      >
        <Sidebar />
      </div>
    </transition>

    <!-- Navbar  -->
    <Navbar
      class="wrapper"
      :isActive="isActiveNav"
      :class="{ full: isActiveNav }"
      @clicked="clickedToggle"
    />

    <!-- ====================================================== -->
    <!-- Header -->
    <main>
     <router-view :isNav="isActiveNav" />
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      isActiveNav: false,
      isMNavActive: false,
    };
  },

  methods: {

    // Hide Sidebar opsi
    clickedToggle() {
      if (this.isActiveNav === true) {
        this.isActiveNav = false;
      } else {
        this.isActiveNav = true;
      }
    },

    clickedToggleMobile() {
      if (this.isMNavActive === true) {
        this.isMNavActive = false;
      } else {
        this.isMNavActive = true;
      }
    },
  },
};
</script>
<style>
/* Content */

.btn-add {
  float: right;
}

.bg-title{
  background: linear-gradient(180deg, rgba(100,93,209,1) 0%, rgba(161,156,242,0.9444152661064426) 100%);
}

.bg-custom {
  /* background-color: #121729; */
  background-color: var(--sidebar-bg-color)!important;
}

.title::after {
  content: "";
  display: block;
  width: 150px;
  margin: auto;
  border-bottom: 3px solid grey;
}
.rounded {
  border-radius: 10px !important;
}

/* Animasi Vue */
.slide-fade-enter-active {
  transition: 0.5s;
}
.slide-fade-leave-active {
  transition: 0.5s;
}
.slide-fade-enter,
.slide-fade-leave-to .slide-fade-leave-active {
  transform: translateX(-200px);
  opacity: 0;
}
</style>
