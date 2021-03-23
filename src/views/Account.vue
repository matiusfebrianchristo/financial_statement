<template>
  <div class="login-form">
    <div class="row m-0 h-100">
      <div
        class="col p-0 text-center d-flex justify-content-center align-items-center align-self-center d-lg-block d-none"
      >
        <img src="../assets/image/login.svg" class="w-100" />
      </div>
      <div
        class="col p-0 bg-login d-flex justify-content-center align-items-center flex-column w-100"
      >
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Account'
}
</script>

<style>

</style>