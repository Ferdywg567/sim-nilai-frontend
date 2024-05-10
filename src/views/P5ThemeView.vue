<style scoped>
@import "../assets/vendor/css/pages/cards-advance.css";
</style>

<script setup>

import Navbar from './../components/Navbar.vue'
import Sidebar from './../components/Sidebar.vue'
import Footer from './../components/Footer.vue'

import '../assets/js/dashboards-analytics.js'

document.documentElement.classList = "light-style layout-navbar-fixed layout-menu-fixed layout-compact"; // rubah class html

const user = localStorage.getItem('user');

let themes = {};

window.axios.get('p5-themes').then((response) => {
  themes = response.data.data;
});
</script>

<template>
  <!-- Layout wrapper -->
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">

      <Sidebar />

      <!-- Layout container -->
      <div class="layout-page">

        <Navbar />

        <!-- Content wrapper -->
        <div class="content-wrapper">
          <!-- Content -->

          <div class="container-xxl flex-grow-1 container-p-y">
            <div class="card card-body">
              <h5>List Tema P5</h5>
              <div class="table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr class="text-nowrap">
                      <th>No.</th>
                      <th>Nama</th>
                      <!-- <th>Aksi</th> -->
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                    <tr v-if="themes != []" v-for="theme in themes" :key="theme.id">
                      <th scope="row">{{ theme.id }}</th>
                      <td>{{ theme.name }}</td>
                      <!-- <td>
                        <button class="btn btn-warning me-2">
                          Edit
                        </button>
                        <button class="btn btn-danger">
                          Hapus
                        </button>
                      </td> -->
                    </tr>
                    <tr v-else=>
                      <td colspan="3">Maaf, belum ada Data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- / Content -->

          <Footer />

          <div class="content-backdrop fade"></div>
        </div>
        <!-- Content wrapper -->
      </div>
      <!-- / Layout page -->
    </div>

    <!-- Overlay -->
    <div class="layout-overlay layout-menu-toggle"></div>

    <!-- Drag Target Area To SlideIn Menu On Small Screens -->
    <div class="drag-target"></div>
  </div>
  <!-- / Layout wrapper -->
</template>
