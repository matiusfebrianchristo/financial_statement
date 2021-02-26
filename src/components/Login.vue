<template>
  <form class="w-75 login-page needs-validation" novalidate :class="{ pageHidden : isLogin === false }">
    <h2 class="fw-bolder header-masuk">Login</h2>
    <hr />
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Username</label>
      <input
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
    <button type="button" class="btn btn-primary btn-lg btn-block mt-3">
      Login
    </button>
    <button
      type="button"
      @click.prevent="moveForm"
      class="btn btn-secondary btn-lg float-end btn-block mt-3"
    >
      Register
    </button>
  </form>
</template>

<script>
export default {
  name: "Login",
  props: ["isLogin"],
  methods: {
    moveForm() {
      this.$emit("clicked");
    },
  },
};
</script>

<style>
</style>