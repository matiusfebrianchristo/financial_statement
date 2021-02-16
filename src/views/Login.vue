<template>
  <div class="login">
    <div class="container">
      <div class="card bg-cusm mb-3 mt-5">
        <div class="row g-0">
          <div class="col-md-4">
            <!-- <img src="..." alt="..." /> -->
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label for="floatingPassword">Password</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style>
/* body{
  color: black;
  background-color: black;
} */

.bg-cusm{
  background-color: rgba(250, 250, 250, 0.5);
}

</style>