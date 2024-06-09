<style scoped>
@import "../../assets/vendor/css/pages/cards-advance.css";
</style>

<script setup>
import Navbar from './../../components/Navbar.vue'
import Sidebar from './../../components/Sidebar.vue'
import Footer from './../../components/Footer.vue'
import Swal from 'sweetalert2';

import '../../assets/js/dashboards-analytics.js'</script>

<script>
export default {
  data() {
    return {
      form: {
        phase: '',
        dimension_id: '',
      },
      phases: [],
      dimensions: [],
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      window.axios.get('admin/p5-dimensions').then(response => {
        this.dimensions = response.data.data;
      }).catch(error => {
        console.error('Error fetching groups:', error);
      });
      document.documentElement.classList = "light-style layout-navbar-fixed layout-menu-fixed layout-compact"; // rubah class html
    },
    getPhases() {
      window.axios.get('admin/p5-phases', {
        phase: this.form.phase,
        dimension_id: this.form.dimension_id,
      }).then(response => {
        this.phases = response.data.data;
      }).catch(error => {
        console.error('Error fetching groups:', error);
      });
    }
  }
}
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
              <h5>List Target Capaian Profil P5</h5>
              <div class="row">
                <div class="col-12 col-md-6">
                  <label class="form-label">Pilih Dimensi Profil</label>
                  <select v-model="form.dimension_id" class="form-select" aria-label="Default select example">
                    <option v-for="dimension in dimensions" :value="dimension.id">{{ dimension.name }}</option>
                  </select>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label" for="project_number">Pilih Fase</label>
                  <select v-model="form.phase" class="form-select" aria-label="Default select example">
                    <option>E</option>
                  </select>
                </div>
              </div>

              <button class="btn btn-info w-100 mt-4" @click="getPhases()">
                <i class="ti ti-search"></i>
                Cari
              </button>

              <div class="table-responsive text-nowrap">
                <table class="table border-hover">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Elemen</th>
                      <th>Sub Elemen</th>
                      <th>Capaian Akhir Fase</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="phases?.length > 0" v-for="phase in phases" :key="phase.id">
                      <td>{{ phase.id }}</td>
                      <td>{{ phase.sub_element.element.name }}</td>
                      <td>{{ phase.sub_element.name }}</td>
                      <td>{{ phase.description }}</td>
                    </tr>
                    <tr v-else>
                      <td colspan="6" class="text-center">Maaf, Belum ada Data</td>
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
