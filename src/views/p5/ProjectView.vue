<style scoped>
@import "../../assets/vendor/css/pages/cards-advance.css";
</style>

<script setup>
import Swal from 'sweetalert2'
import Navbar from './../../components/Navbar.vue'
import Sidebar from './../../components/Sidebar.vue'
import Footer from './../../components/Footer.vue'

import '../../assets/js/dashboards-analytics.js'

document.documentElement.classList = "light-style layout-navbar-fixed layout-menu-fixed layout-compact"; // rubah class html

const user = localStorage.getItem('user');
</script>


<script>
    export default {
    data() {
        return {
            projects: [],
            p5: [],
        };
    },
    mounted() {
            window.axios.get('p5-groups/1/projects')
            .then(response => {
                this.projects = response.data.data;
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
        },
    methods: {
        deleteProjectConfirmation() {
            Swal.fire({
                title: "Yakin ingin menghapus projek?",
                text: "Projek yang dihapus tidak dapat dipulihkan",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Iya, Lanjutkan Menghapus"
            }).then((result) => {
                if (result.isConfirmed) {
                // Tambahin disini buat ngehapus terus panggil fungsi dibawah ini fer
                this.deleteProject();
                }
            });
        },
        deleteProject() {
            Swal.fire({
                title: "Berhasil!",
                text: "Projek berhasil dihapus",
                icon: "success"
            });
        },
        addProject() {
            // fungsi buat nyimpen ditaruh sini fer
            $('#modal-add_project').modal('hide')
            Swal.fire({
                title: "Berhasil!",
                text: "Projek berhasil dibuat",
                icon: "success"
            });
        },
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
            <h5>
                Data Projek P5
                <button class="float-end w-fit btn btn-sm btn-success" type="button"><span><i class="ti ti-plus me-0 me-sm-1 ti-xs"></i><span class="d-none d-sm-inline-block"  data-bs-toggle="modal" data-bs-target="#modal-add_project" >Tambah Projek</span></span></button>
            </h5>
              <div class="table-responsive ">
                <table class="table">
                  <thead>
                    <tr class="text-nowrap">
                      <th>No.</th>
                      <th>Nama Proyek</th>
                      <th>Deskripsi Proyek</th>
                      <th>Capaian Profil</th>
                      <th>Opsi</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                    <tr v-for="project in projects" :key="project.id">
                      <!-- <th scope="row">{{ guru.id }}</th>
                      <td>{{ project.id }}</td> -->
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Hubla Projek</td>
                        <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, debitis vel? Assumenda accusantium tempora veritatis beatae similique omnis amet, voluptatum maiores pariatur mollitia impedit minus facere dignissimos voluptatem dolor esse?</td>
                        <td>
                            <button class="float-end w-fit btn btn-sm btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#modal-check_achievements" data-project_id="1"><span><i class="ti ti-eye me-0 me-sm-1 ti-xs"></i><span class="d-none d-sm-inline-block">Cek</span></span></button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-warning m-1" type="button">
                                <span><i class="ti ti-pencil me-1 ti-xs"></i><span class="d-pencil d-sm-inline-block">Ubah</span></span>
                            </button>
                            <button class="btn btn-sm btn-danger m-1" type="button" @click="deleteProjectConfirmation()">
                                <span><i class="ti ti-trash me-1 ti-xs"></i><span class="d-trash d-sm-inline-block">Hapus</span></span>
                            </button>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>



          <!-- Modal Content -->

            <!-- add projet -->
            <div class="modal fade" id="modal-add_project" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Buat Projek Baru</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <!-- project number -->
                            <div class="mb-2">
                                <span><label class="form-label" for="project_number">No. Projek</label></span>
                                <input type="text" class="form-control" id="project_number">
                            </div>

                            <!-- project name -->
                            <div class="mb-2">
                                <span><label class="form-label" for="project_name">Nama Projek</label></span>
                                <input type="text" class="form-control" id="project_name">
                            </div>

                            <hr> 
                            <!-- theme project -->
                            <div class="mb-2">
                                <span><label class="form-label" for="theme_project">Pilih Tema Projek</label></span>
                                <select class="form-control" name="" id="theme_project">
                                    <option value="">Tema 1</option>
                                    <option value="">Tema 2</option>
                                </select>
                            </div>

                            <!-- phase project -->
                            <div class="mb-2">
                                <span><label class="form-label" for="phase_project">Pilih Fase Projek</label></span>
                                <select class="form-control" name="" id="phase_project">
                                    <option value="">Fase 1</option>
                                    <option value="">Fase 2</option>
                                </select>
                            </div>
                            <hr>

                            <!-- Description -->
                            <div class="mb-2">
                                <span><label class="form-label" for="project_desc">Deskripsi Projek</label></span>
                                <textarea name="" class="form-control" id="project_desc" rows="6"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-primary col-md-12" id="#submit-add_project" @click="addProject()">Simpan</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- profile achivement -->
            <div class="modal fade" id="modal-check_achievements" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Projek : Hubla Projek</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <button class="float-end w-fit btn btn-sm btn-success" type="button"><span><i class="ti ti-plus me-0 me-sm-1 ti-xs"></i><span class="d-none d-sm-inline-block">Tambah Pencapaian</span></span></button>
                            
                            <table class="table border-hover">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Dimensi</th>
                                        <th>Elemen</th>
                                        <th>Sub Elemen</th>
                                        <th>Capaian Akhir Fase</th>
                                        <th><button class="btn btn-sm btn-outline-danger">Hapus Semua</button></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>dimensi projek</td>
                                        <td>elemen projek</td>
                                        <td>sub elemen projek</td>
                                        <td>capaian akhir projek</td>
                                        <td>
                                            <button class="btn btn-sm btn-danger m-1" type="button">
                                                <span><i class="ti ti-trash me-1 ti-xs"></i><span class="d-trash d-sm-inline-block">Hapus</span></span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
          <!-- End Modal Content -->


          
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