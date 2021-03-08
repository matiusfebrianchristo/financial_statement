<template>
  <form
    class="w-75 login-page needs-validation"
    novalidate
    :class="{ pageHidden: isLogin === false }"
    @submit.prevent="login"
  >
    <h2 class="fw-bolder header-masuk">Login</h2>
    <hr />
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Username</label>
      <input
        v-model="username"
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
        v-model="password"
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
import axios from "axios";
export default {
  name: "Login",
  props: ["isLogin"],
  data() {
    return {
      username: "",
      password: "",
      progress: false,
    };
  },
  methods: {
    moveForm() {
      this.$emit("clicked");
    },
    async login() {
      this.progress = true;
      if (this.username !== "" && this.password !== "") {
        await axios
          .post("accounts/usertoken/", {
            username: this.username,
            password: this.password,
          })
          .then((res) => {
            localStorage.setItem("token_access", res.data.access);
            localStorage.setItem("token_refresh", res.data.refresh);
            localStorage.setItem("login", true);
            const token = res.data.access;
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            console.log(res);
            setTimeout(() => {
              
              this.$router.push("/");
              this.progress = false;
            }, 2000);
          })
          .catch((err) => {
            this.progress = false;
            this.$toast.error("Username dan Password tidak valid", {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
            console.log(err);
          });
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