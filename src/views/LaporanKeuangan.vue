<template>
  <div class="content">
    <!-- Sidebar -->
    <transition name="slide-fade">
      <div
        class="d-lg-block d-none fixed sidebar"
        :class="{ hide: isActiveNav, show: isMNavActive }"
      >
        <Sidebar />
      </div>
    </transition>
    <transition name="slide-fade">
      <div
        class="d-sm-block d-lg-none position-absolute fixed sidebar"
        :class="{ hide: isMNavActive, show: isMNavActive }"
      >
        <Sidebar :isActive="isMNavActive" @clicked="clickedToggleMobile"  />
      </div>
    </transition>

    <!-- Modals Logout -->
    <ModalsLogout />

    <!-- Navbar  -->
    <Navbar
      :isActive="isActiveNav"
      :isMActive="isMNavActive"
      :class="{ full: isActiveNav }"
      @clicked="clickedToggle"
      @clickedMobile="clickedToggleMobile"
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
import ModalsLogout from "@/components/ModalsLogout.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    ModalsLogout,
  },
  data() {
    return {
      isActiveNav: false,
      isMNavActive: true,
    };
  },
  mounted() {
    this.cekLoginStatus();
  },
  methods: {
    cekLoginStatus() {
      if (localStorage.getItem("token_access") === null) {
        
        this.$router.push("/masuk");
      }
    },

    // Hide Sidebar opsi
    clickedToggle() {
      if (this.isActiveNav === true) {
        this.isActiveNav = false;
      } else {
        this.isActiveNav = true;
      }
    },

    clickedToggleMobile() {
      this.isMNavActive = !this.isMNavActive
    },
  },
};
</script>
<style>
/* Content */

.bg-graphic {
  /* background: linear-gradient(0deg, rgba(76,209,209,1) 0%, rgba(118,220,220,1) 100%); */
  background-color: #f8f9fa;
  box-shadow: 1px 1px 20px 1px rgba(10, 10, 10, 0.5);
  /* border: 1px solid black; */
}

.light-mode {
  background-color: #f3f7f9;
  color: #2f495e;
  box-shadow: 1px 1px 5px rgba(10, 10, 10, 0.8);
}

.btn-success {
  background-color: var(--button-bg-color) !important;
  border: none;
  color: white;
  font-weight: 600 !important;
}

.bg-table {
  background-color: #f8f9fa;
  box-shadow: 1px 1px 20px 1px rgba(10, 10, 10, 0.5);
  color: grey;
}

.btn-add {
  float: right;
}

.bg-title {
  background: linear-gradient(
    180deg,
    rgba(100, 93, 209, 1) 0%,
    rgba(161, 156, 242, 0.9444152661064426) 100%
  );
}

.bg-custom {
  /* background-color: #121729; */
  background-color: var(--sidebar-bg-color) !important;
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
