<style scoped>
@import "../assets/vendor/css/pages/cards-advance.css";
</style>

<script setup>

import Navbar from './../components/Navbar.vue'
import Sidebar from './../components/Sidebar.vue'
import Footer from './../components/Footer.vue'

import '../assets/js/dashboards-analytics.js'
document.documentElement.classList = "light-style layout-navbar-fixed layout-menu-fixed layout-compact"; // rubah class html
</script>

<script>
export default {
  data() {
    return {
      objectives: [],
      selectedSubject: [],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      console.log('test');
    }
  }
};
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
              <h5>List Guru yang Mengajar</h5>
              <div class="table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr class="text-nowrap">
                      <th>No.</th>
                      <th>Nama</th>
                      <th>NIP</th>
                      <th>Tanggal Lahir</th>
                      <th>Domisili</th>
                      <th>Email</th>
                      <th>Nomor Telepon</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                    <tr v-if="gurus.length > 0" v-for="guru in gurus" :key="guru.id">
                      <td>{{ guru.id }}</td>
                      <td>{{ guru.name }}</td>
                      <td>{{ guru.nip }}</td>
                      <td>{{ guru.dob }}</td>
                      <td>{{ guru.address }}</td>
                      <td>{{ guru.email }}</td>
                      <td>{{ guru.phone }}</td>
                    </tr>
                    <tr v-else>
                      <td colspan="7" class="text-center">Maaf, belum ada Data.</td>
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
