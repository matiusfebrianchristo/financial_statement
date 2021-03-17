<template>
  <div class="login-form">
    <div class="row m-0 h-100">
      <div
        class="col p-0 text-center d-flex justify-content-center align-items-center align-self-center d-lg-block d-none"
      >
        <img src="../assets/image/login2.svg" class="w-100 p-5" />
      </div>
      <div
        class="col p-0 bg-login main-form-content d-flex justify-content-center align-items-center flex-column w-100"
      >
        <!-- ===================================================================================== -->
        <transition name="slide-fade">
          <Login />
        </transition>

        <!-- <transition name="slide-fade">
          <Register v-if="register === true" @clicked="moveForm" />
        </transition> -->
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
// import Register from "@/components/Register.vue";

export default {
  name: "Masuk",
  components: {
    Login,
    // Register,
  },
  data() {
    return {
      login: true,
      register: false,
    };
  },
  mounted() {
    if (localStorage.getItem("tendang") === "true") {
      this.$toast.error("Login dahulu", {
        type: "error",
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
      localStorage.setItem("tendang", false);
    }
  },
  methods: {
    moveForm() {
      if (this.login === true && this.register === false) {
        this.login = false;
        setTimeout(() => {
          this.register = true;
        }, 600);
      } else {
        this.register = false;
        setTimeout(() => {
          this.login = true;
        }, 600);
      }
    },
  },
};
</script>
<style>
.main-form-content {
  overflow: hidden;
}

.login-page hr {
  color: white;
}

.header-masuk {
  letter-spacing: 5px;
}

/* Animation */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(200px);
  opacity: 0;
}
</style>