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
      gurus: [],
      groups: [],
      classes: [],
      students: [],
      projects: [],
      selectedGroup: [],
      selectedProjects: [],
      selectedProjectIds: [],
      modalStatus: '',
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      window.axios.get('p5-groups').then(response => {
        this.groups = response.data.data;
      }).catch(error => {
        console.error('Error fetching groups:', error);
      });

      this.getProjects();
      this.getStudents();
      this.getGurus();
      document.documentElement.classList = "light-style layout-navbar-fixed layout-menu-fixed layout-compact"; // rubah class html
    },
    selectGroup(group) {
      this.selectedGroup = group;
      this.selectedProjects = group.projects;
      this.selectedProjectIds = this.selectedProjects.map(project => project.id);

    },
    closeModal() {
      $('.modal').modal('hide');

      this.selectedProjects = [];
      this.selectedProjectIds = [];
      this.selectedGroup = [];
    },
    getProjects() {
      window.axios.get('p5-projects').then(response => {
        this.projects = response.data.data;
      }).catch(error => {
        console.error('Error fetching projects:', error);
      });
    },
    getGurus() {
      window.axios.get('gurus').then(response => {
        this.gurus = response.data.data;
      }).catch(error => {
        console.error('Error fetching gurus:', error);
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
        console.error('Error adding project:', error);
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
        console.error('Error deleting project:', error);
      });
    },
    getStudyClass() {
      window.axios.get('classes').then(response => {
        this.classes = response.data.data;
      }).catch(error => {
        console.error('Error fetching classes:', error);
      });
    },
    getStudents() {
      this.students = this.selectedGroup.students;
      // window.axios.get(`p5-groups/${this.selectedGroup.id}/students`).then(response => {
      //   this.students = response.data.data;
      // }).catch(error => {
      //   console.error('Error fetching classes:', error);
      // });
    },
    addStudentsFromClass(studyClass) {
      console.log("🚀 ~ addStudentsFromClass ~ studyClass:", studyClass)
      window.axios.post(`p5-groups/${this.selectedGroup.id}/class/${studyClass.id}`).then(response => {
        Swal.fire({
          title: "Berhasil!",
          text: response.data.message,
          icon: "success"
        });
        this.load();
      }).catch(error => {
        console.error('Error adding project:', error);
      });
    },
    deleteStudentFromGroup(student) {
      window.axios.delete(`p5-groups/${this.selectedGroup.id}/students/${student.id}`).then(response => {
        Swal.fire({
          title: "Berhasil!",
          text: response.data.message,
          icon: "success"
        });
        this.load();
      }).catch(error => {
        console.error('Error deleting project:', error);
      });
    },
    setModalStatus(status) {
      this.modalStatus = status;
    },

    saveGroup() {
      if (this.modalStatus == 'Tambah') {
        this.createGroup();
        return
      }

      this.editGroup();
    },
    createGroup() {
      window.axios.post(`p5-groups`, {
        guru_id: this.selectedGroup.guru_id,
        name: this.selectedGroup.name,
        grade: this.selectedGroup.grade,
        phase: this.selectedGroup.phase,
      }).then(response => {
        Swal.fire({
          title: "Berhasil!",
          text: response.data.message,
          icon: "success"
        });
        this.load();
        this.closeModal();
      }).catch(error => {
        console.error('Error adding group:', error);
      });
    },
    editGroup() {
      window.axios.put(`p5-groups/${this.selectedGroup.id}`, {
        guru_id: this.selectedGroup.guru_id,
        name: this.selectedGroup.name,
        grade: this.selectedGroup.grade,
        phase: this.selectedGroup.phase,
      }).then(response => {
        Swal.fire({
          title: "Berhasil!",
          text: response.data.message,
          icon: "success"
        });
        this.load();
        this.closeModal();
      }).catch(error => {
        console.error('Error editing group:', error);
      });
    },
    deleteGroupConfirmation(group) {
      Swal.fire({
        title: "Yakin ingin menghapus Kelompok?",
        text: "Kelompok yang dihapus tidak dapat dipulihkan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iya, Hapus Data!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteGroup(group);
        }
      });
    },
    deleteGroup(group) {
      window.axios.delete(`p5-groups/${group.id}`).then(response => {
        Swal.fire({
          title: "Berhasil!",
          text: response.data.message,
          icon: "success"
        });
        this.load();
      }).catch(error => {
        console.error('Error deleting group:', error);
      });
    }
  }
}
</script>


<template>
  <!--/ List Project -->
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
                <tr v-if="projects?.length" v-for="project in projects" :key="project.id">
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
                  <td colspan="5" class="text-center">Maaf, belum ada Data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--/ List Project -->

  <!-- Add Group -->
  <div class="modal fade" id="GroupForm" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Form {{ modalStatus }} Kelompok P5</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="closeModal()"></button>
        </div>
        <div class="modal-body">

          <!-- project name -->
          <div class="mb-2">
            <span><label class="form-label" for="project_name">Nama Kelompok</label></span>
            <input type="text" class="form-control" id="project_name" v-model="selectedGroup.name">
          </div>

          <hr>
          <!-- theme project -->
          <div class="mb-2">
            <label class="form-label" for="theme_project">Pilih Koordinator P5</label>
            <select class="form-control" name="" id="theme_project" v-model="selectedGroup.guru_id">
              <option v-for="guru in gurus" :value="guru.id">{{ guru.name }}</option>
            </select>
          </div>

          <!-- phase project -->
          <div class="mb-2">
            <label class="form-label" for="grade_project">Pilih Tingkat</label>
            <select v-model="selectedGroup.grade" class="form-control" name="" id="grade_project">
              <option>10</option>
            </select>
          </div>

          <div class="mb-2">
            <label class="form-label" for="phase_project">Pilih Fase</label>
            <select v-model="selectedGroup.phase" class="form-control" name="" id="phase_project">
              <option>E</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary col-md-12" id="#submit-add_project" @click="saveGroup()">Simpan</button>
        </div>
      </div>
    </div>
  </div>

  <!--/ List Kelas -->
  <div class="modal fade" id="classList" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-simple">
      <div class="modal-content p-3 p-md-5">
        <div class="modal-body">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="mb-4 d-flex justify-content-between">
            <h3 class="mb-2">List Data Rombel</h3>
          </div>
          <div class="table-responsive text-nowrap">
            <table class="table">
              <thead>
                <tr class="text-nowrap">
                  <th scope="col">No.</th>
                  <th scope="col">Nama Rombel</th>
                  <th scope="col">Jumlah Siswa</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody class="table-border-bottom-0">
                <tr v-if="classes?.length > 0" v-for="studyClass in classes" :key="studyClass.id">
                  <th scope="row">{{ studyClass.id }}</th>
                  <td>{{ studyClass.name }}</td>
                  <td>{{ studyClass.students?.length ?? 0 }}</td>
                  <td>
                    <button class="btn btn-sm btn-success" @click="addStudentsFromClass(studyClass)">
                      <i class="ti ti-plus me-2"></i>
                      Tambah
                    </button>
                  </td>
                </tr>
                <tr v-else>
                  <td colspan="4" class="text-center">Maaf, belum ada Data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--/ List Kelas -->

  <!--/ List Siswa -->
  <div class="modal fade" id="studentList" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-simple">
      <div class="modal-content p-3 p-md-5">
        <div class="modal-body">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="mb-4 d-flex justify-content-between">
            <h3 class="mb-2">List Siswa di Kelompok {{ selectedGroup.name }}</h3>
          </div>
          <div class="table-responsive text-nowrap">
            <table class="table">
              <thead>
                <tr class="text-nowrap">
                  <th scope="col">No.</th>
                  <th scope="col">Nama</th>
                  <th scope="col">NIS</th>
                  <th scope="col">Jenis Kelamin</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody class="table-border-bottom-0">
                <tr v-if="students?.length > 0" v-for="student in students" :key="student.id">
                  <th scope="row">{{ student.id }}</th>
                  <td>{{ student.name }}</td>
                  <td>{{ student.nis }}</td>
                  <td>{{ student.gender }}</td>
                  <td>
                    <button class="btn btn-sm btn-danger" @click="deleteStudentFromGroup(student)">
                      <i class="ti ti-trash me-2"></i>
                      Hapus
                    </button>
                  </td>
                </tr>
                <tr v-else>
                  <td colspan="5" class="text-center">Maaf, belum ada Data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--/ List Siswa -->

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
              <div class="d-flex justify-content-between">
                <h5>List Kelompok P5</h5>
                <button class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#GroupForm"
                  @click="setModalStatus('Tambah')">
                  <i class="ti ti-xs ti-plus me-1"></i>
                  Buat Kelompok
                </button>
              </div>
              <div class="table-responsive text-nowrap">
                <table class="table">
                  <thead>
                    <tr class="text-nowrap">
                      <th scope="col">No.</th>
                      <th scope="col">Nama Kelompok</th>
                      <th scope="col">Tingkat</th>
                      <th scope="col">Fase</th>
                      <th scope="col">Koordinator</th>
                      <th scope="col">Siswa</th>
                      <th scope="col">Aksi</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                    <tr v-if="groups?.length > 0" v-for="group in groups" :key="group.id">
                      <th scope="row">{{ group.id }}</th>
                      <td>{{ group.name }}</td>
                      <td>{{ group.grade }}</td>
                      <td>{{ group.phase }}</td>
                      <td>{{ group.coordinator.name }}</td>
                      <td>
                        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#studentList"
                          @click="selectGroup(group); getStudents()">
                          <i class="ti ti-eye me-0 me-sm-1 ti-xs"></i>
                          Lihat
                        </button>
                      </td>
                      <td>
                        <div class="dropdown">
                          <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <i class="ti ti-dots-vertical"></i>
                          </button>
                          <div class="dropdown-menu">
                            <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal"
                              data-bs-target="#classList" @click="getStudyClass(); selectGroup(group)"><i
                                class="ti ti-plus me-2"></i>
                              Tambah Siswa</a>
                            <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal"
                              data-bs-target="#projectList" @click="getProjects(); selectGroup(group)"><i
                                class="ti ti-plus me-2"></i>
                              Tambah Proyek</a>
                            <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal"
                              data-bs-target="#GroupForm" @click="setModalStatus('Edit'); selectGroup(group)"><i
                                class="ti ti-pencil me-2"></i>
                              Edit</a>
                            <a class="dropdown-item" href="javascript:void(0);" @click="deleteGroupConfirmation(group)"><i
                                class="ti ti-trash me-2"></i>
                              Delete</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr v-else>
                      <td colspan="6" class="text-center">Maaf, belum ada Data</td>
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
