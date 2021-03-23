<template>
  <form
    class="w-75 login-page needs-validation"
    novalidate
    :class="{ pageHidden: isLogin === false }"
    @submit.prevent="masuk(data)"
  >
    <h2 class="fw-bolder header-masuk">Login</h2>
    <hr />
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Username</label>
      <input
        v-model="data.username"
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="username"
        required
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput2" class="form-label">Password</label>
      <input
        v-model="data.password"
        type="password"
        class="form-control"
        id="exampleFormControlInput2"
        placeholder="password"
        required
      />
    </div>
    <div class="row">
      <div class="col-md-6">
        <!-- <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Keep me logged in
          </label>
        </div> -->
      </div>
    </div>
    <button
      v-if="progress === true"
      class="btn btn-primary btn-lg btn-block mt-3"
      type="button"
      disabled
    >
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      <span class="visually-hidden">Loading...</span>
    </button>
    <button v-else class="btn btn-primary btn-lg btn-block mt-3">Login</button>
    <!-- <button
      type="button"
      @click.prevent="moveForm"
      class="btn btn-secondary btn-lg float-end btn-block mt-3"
    >
      Register
    </button> -->
  </form>
</template>

<script>
// import axios from "axios";
import { mapActions } from "vuex";
// import axios from 'axios'

export default {
  name: "Login",
  props: ["isLogin"],
  data() {
    return {
      data: {},
      progress: false,
    };
  },
  computed:{
    // ...mapGetters(['token'])
  },
  methods: {
    moveForm() {
      this.$emit("clicked");
    },
    ...mapActions(['login']),
     masuk(data) {
      
      // this.progress = true;
      if (data.username !== "" && data.password !== "") {
        this.progress = true;
        this.login(data)
        .then((res) => {
          this.progress = false
          localStorage.setItem("login", true);
          localStorage.setItem('token_access', res.data.access)
          localStorage.setItem('token_refresh', res.data.refresh)

          // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          // Harus diperbaiki
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err)
          this.$toast.error("Isi username dan password", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
        })


      } else {
        this.progress = false;
        this.$toast.error("Isi username dan password", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
    
  },
  
};
</script>

<style>
</style>