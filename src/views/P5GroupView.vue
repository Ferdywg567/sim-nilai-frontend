<style scoped>
@import "../assets/vendor/css/pages/cards-advance.css";
</style>

<script setup>
import Navbar from './../components/Navbar.vue'
import Sidebar from './../components/Sidebar.vue'
import Footer from './../components/Footer.vue'
import Swal from 'sweetalert2';

import '../assets/js/dashboards-analytics.js'</script>

<script>
export default {
  data() {
    return {
      groups: [],
      projects: [],
      selectedGroup: [],
      selectedProjects: [],
      selectedProjectIds: [],
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      window.axios.get('p5-groups').then(response => {
        this.groups = response.data.data;
      });
      document.documentElement.classList = "light-style layout-navbar-fixed layout-menu-fixed layout-compact"; // rubah class html
    },
    selectGroup(group) {
      this.selectedGroup = group;
      this.selectedProjects = group.projects;
      this.selectedProjectIds = this.selectedProjects.map(project => project.id);

    },
    closeModal() {
      this.selectedProjects = [];
    },
    getProjects() {
      window.axios.get('p5-projects').then(response => {
        this.projects = response.data.data;
      });
    },
    addProjectToGroup(project) {
      window.axios.post(`p5-groups/${this.selectedGroup.id}/projects/${project.id}`).then(response => {
        this.selectedProjectIds.push(project.id);
        Swal.fire({
          title: "Berhasil!",
          text: response.data.message,
          icon: "success"
        });
      }).catch(error => {
        Swal.fire({
          title: "Maaf...",
          text: response.data.message,
          icon: "error"
        });
      });
    },
    deleteProjectFromGroup(project) {
      window.axios.delete(`p5-groups/${this.selectedGroup.id}/projects/${project.id}`).then(response => {
        this.selectedProjectIds.splice(this.selectedProjectIds.indexOf(project.id), 1);
        Swal.fire({
          title: "Berhasil!",
          text: response.data.message,
          icon: "success"
        });
      }).catch(error => {
        Swal.fire({
          title: "Maaf...",
          text: response.data.message,
          icon: "error"
        });
      });
    }
  }
}
</script>


<template>
  <div class="modal fade" id="projectList" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-simple">
      <div class="modal-content p-3 p-md-5">
        <div class="modal-body">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="mb-4 d-flex justify-content-between">
            <h3 class="mb-2">Data Proyek Kelompok {{ selectedGroup.name }}</h3>
          </div>
          <div class="table-responsive text-nowrap">
            <table class="table">
              <thead>
                <tr class="text-nowrap">
                  <th scope="col">No.</th>
                  <th scope="col">Tema</th>
                  <th scope="col">Nama Proyek</th>
                  <th scope="col">Deskripsi</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody class="table-border-bottom-0">
                <tr v-if="projects != []" v-for="project in projects" :key="project.id">
                  <th scope="row">{{ project.id }}</th>
                  <td>{{ project.theme.name }}</td>
                  <td>{{ project.name }}</td>
                  <td>{{ project.description }}</td>
                  <td>
                    <button v-if="selectedProjectIds.includes(project.id)" class="btn btn-sm btn-danger"
                      @click="deleteProjectFromGroup(project)">
                      <i class="ti ti-trash me-2"></i>
                      Hapus
                    </button>
                    <button v-else class="btn btn-sm btn-success" @click="addProjectToGroup(project)">
                      <i class="ti ti-plus me-2"></i>
                      Tambah
                    </button>
                  </td>
                </tr>
                <tr v-else>
                  <td colspan="3">Maaf, belum ada Data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--/ Edit User Modal -->

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
              <h5>List Kelompok P5</h5>
              <div class="table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr class="text-nowrap">
                      <th scope="col">No.</th>
                      <th scope="col">Nama Kelompok</th>
                      <th scope="col">Tingkat</th>
                      <th scope="col">Fase</th>
                      <th scope="col">Koordinator</th>
                      <th scope="col">Aksi</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                    <tr v-if="groups != []" v-for="group in groups" :key="group.id">
                      <th scope="row">{{ group.id }}</th>
                      <td>{{ group.name }}</td>
                      <td>{{ group.grade }}</td>
                      <td>{{ group.phase }}</td>
                      <td>{{ group.coordinator.name }}</td>
                      <td>
                        <div class="dropdown">
                          <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i class="ti ti-dots-vertical"></i>
                          </button>
                          <div class="dropdown-menu">
                            <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal"
                              data-bs-target="#projectList" @click="getProjects(); selectGroup(group)"><i
                                class="ti ti-plus me-2"></i>
                              Tambah Proyek</a>
                            <a class="dropdown-item" href="javascript:void(0);"><i class="ti ti-pencil me-2"></i>
                              Edit</a>
                            <a class="dropdown-item" href="javascript:void(0);"><i class="ti ti-trash me-2"></i>
                              Delete</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr v-else>
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
