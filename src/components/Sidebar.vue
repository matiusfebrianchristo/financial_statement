<template>
  <div class="sidebar">
    <div
      class="sidebar-header d-flex justify-content-center align-items-left px-3 py-4"
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
        <div class="link-container" >
          <i class="bi bi-house"></i> <span >Dashboard</span> 
        </div>
      </router-link>
      <router-link
        to="/laporan_keuangan"
        active-class="active"
        
        tag="button"
        class="side-btn"
      >
        <div class="link-container">
          <i class="bi bi-journal-text"></i> <span>Laporan Keuangan</span> 
        </div>
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
.link-container i{
margin-left: 30px;
}
.link-container span{
  color: var(--dk-gray-300);
  margin-left: 10px;
  
}

.menu-items {
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  

  /* padding: 0px 10px; */
}

.menu-items > * {
  margin-top: 10px;
  text-align: left;
  text-shadow: 2px 2px 4px black;
  /* border-radius: 20px; */
}

.side-btn.active {
    background-color: #6159d0;
    border-right: 2px solid white;
    font-weight: bold;
}

.side-btn.active .link-container span{
  color:white;
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

