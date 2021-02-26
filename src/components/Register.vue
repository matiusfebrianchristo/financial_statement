<template>
  <form class="w-75 register-page" :class="{ pageHidden : isRegister === false }">
    <h2 class="fw-bolder header-masuk">Register</h2>
    <hr />
    <div>
      <div v-if="registerUser === false" class="form-1">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >Username</label
          >
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="username"
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput2" class="form-label"
            >Password</label
          >
          <input
            type="text"
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
      </div>
      <div v-else class="form-2">
        <div class="mb-3">
          <label for="exampleFormControlInput3" class="form-label"
            >Nama Depan</label
          >
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput3"
            placeholder="Nama Depan"
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput4" class="form-label"
            >Nama Belakang</label
          >
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput4"
            placeholder="Nama Belakang"
            required
          />
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
      <button
        v-else
        type="button"
        @click.prevent="register"
        class="btn btn-primary btn-lg btn-block mt-3"
      >
        Next
      </button>
      <button
        type="button"
        @click.prevent="moveForm"
        class="btn btn-secondary btn-lg float-end btn-block mt-3"
      >
        Login
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Register",
  props: ['isRegister'],
  data() {
    return {
      registerUser: false,
      progress: false,
    };
  },
  methods: {
    moveForm(){
      this.$emit('clicked')
    },
    register() {
      if (this.registerUser === false) {
        this.progress = true;

        setTimeout(() => {
          this.progress = false;
          this.registerUser = true;
          console.log(this.progress);
        }, 2000);
      } else {
        this.progress = true

        setTimeout(()=>{
          this.progress = false;
          this.registerUser = false;
          this.moveForm();
          this.$toast.success("Registrasi Berhasil!", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
        }, 2000)
        
      }
    },
  },
};
</script>

<style>
</style>