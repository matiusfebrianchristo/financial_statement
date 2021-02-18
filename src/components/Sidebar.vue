<template>
  <div class="sidebar">
    <div
      class="sidebar-header d-flex justify-content-center align-items-center px-3 py-4"
    >
      <img
        class="rounded-pill img-fluid"
        width="65"
        src="../assets/image/home.png"
        alt=""
      />
      <div class="ms-2">
        <h5 class="fs-6 mb-0">
          <a class="text-decoration-none" @click.prevent href="">Dashboard</a>
        </h5>
        <p class="mt-1 mb-0">Aguna Course's Dashboard.</p>
      </div>
    </div>

    <hr />
    <div class="menu-items">
      <router-link
        to="/dashboard"
        active-class="active"
        exact
        tag="button"
        class="side-btn"
      >
        <div class="link-container">
          <i class="bi bi-cart3"></i> Dashboard
        </div>
      </router-link>
      <router-link
        to="/laporan_keuangan"
        active-class="active"
        exact
        tag="button"
        class="side-btn"
      >
        <div class="link-container">
          <i class="bi bi-cart3"></i> Laporan Keuangan
        </div>
      </router-link>
      <router-link
        to="/detail_bulanan"
        active-class="active"
        exact
        tag="button"
        class="side-btn"
      >
        <div class="link-container">About</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style>
.sidebar .sidebar-header h5 a {
  color: #d1d5db;
}

.sidebar .sidebar-header p {
  color: #9ca3af;
  font-size: 0.825rem;
}

.menu-items {
  display: flex;
  flex-direction: column;
  margin-top: 35px;

  /* padding: 0px 10px; */
}

.menu-items > * {
  margin-top: 10px;
  text-shadow: 2px 2px 4px black;
  /* border-radius: 20px; */
}

.side-btn.active {
    background-image: linear-gradient(to right, rgba(94, 96, 130, 0.5) , rgba(23, 31, 39, 0.5));
    border-right: 2px solid white;
    font-weight: bold;
}

.side-btn:focus {
  outline: none;
}

.side-btn {
  border: none;
  padding: 10px 0px;
  cursor: pointer;
  font-size: 16px;
  color: white;
  background: none;
}
</style>

