<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-custom">
    <div class="container-fluid">
      <router-link
        class="navbar-brand dash-p"
        :class="{ show: isActive === true }"
        to="/"
        ><strong>Dashboard</strong></router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto justify-content-end mb-2 mb-lg-0">
          <li class="nav-item d-lg-none d-sm-block">
            <Sidebar />
          </li>
        </ul>
      </div>
      <div class="ml-auto d-none button-close d-lg-block">
        <!-- <i @click="onClick" class="bi bi-justify"></i> -->
        <div class="wrapper-nav" @click="onClick">
          <div class="circle icon" :class="{ close : isActive === false}">
            <span class="line top"></span>
            <span class="line middle"></span>
            <span class="line bottom"></span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  props: ["isActive"],
  components: {
    Sidebar,
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
  },
};
</script>

<style>
.wrapper-nav {
  background: rgba(30, 30, 30, 0.9);
  display: inline-block;
  border: 1px solid rgba(30, 30, 30, 0.9) ;
  border-radius: 500px;
  margin-right: 20px;
  position: relative;
  padding: 9px;
  cursor: pointer;
}

.circle {
  width: 25px;
  height: 25px;
  position: relative;
}

.line {
  position: absolute;
  height: 2px;
  width: 100%;
  background: #fff;
  border-radius: 8px;
  transition: all cubic-bezier(0.26, 0.1, 0.27, 1.55) 0.5s;
}

.top {
  top: 18%;
}
.middle {
  top: 48%;
}
.bottom {
  top: 78%;
}

.icon.close .top {
  transform: rotate(45deg);
  top: 48%;
}
.icon.close .middle,
.icon.close .bottom {
  transform: rotate(-45deg);
  top: 48%;
}

.dash-p {
  transform: translateX(-250px);
  transition: 0.3s ease-in-out;
}

.dash-p.show {
  transform: translateY(0);
}

.navbar {
  right: auto !important;
  left: 0 !important;
  background-color: #252636 !important;
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
</style>