<style scoped>
@import "../assets/vendor/css/pages/cards-advance.css";
</style>

<script setup>

import Navbar from './../components/Navbar.vue'
import Sidebar from './../components/Sidebar.vue'
import Footer from './../components/Footer.vue'

import '../assets/js/dashboards-analytics.js'
</script>

<script>
export default {
  data() {
    return {
      students: []
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      window.axios.get('students').then(response => {
        this.students = response.data.data;
      }).catch(error => {
        console.error('Error fetching students:', error);
      });

      document.documentElement.classList = "light-style layout-navbar-fixed layout-menu-fixed layout-compact"; // rubah class html
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
              <h5>List Data Siswa yang Diampu</h5>
              <div class="table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr class="text-nowrap">
                      <th>No.</th>
                      <th>Nama</th>
                      <th>NIS</th>
                      <th>Tanggal Lahir</th>
                      <th>Domisili</th>
                      <th>Jenis Kelamin</th>
                      <th>Kelas</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                    <tr v-if="students.length > 0" v-for="student in students" :key="student.id">
                      <td>{{ student.id }}</td>
                      <td>{{ student.name }}</td>
                      <td>{{ student.nis }}</td>
                      <td>{{ student.dob }}</td>
                      <td>{{ student.address }}</td>
                      <td>{{ student.gender }}</td>
                      <td>{{ student.study_class?.name }}</td>
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
