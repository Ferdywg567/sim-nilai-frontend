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
</script>


<script>
export default {
    data() {
        return {
            selectedProject: {
                code: '',
                name: '',
                phase: '',
                description: '',
                p5_theme_id: ''
            },
            projects: [],
            themes: [],
            subelements: [],
            p5: [],
            modalStatus: [],
        };
    },
    mounted() {
        this.load();
    },
    methods: {
        load() {
            window.axios.get('admin/p5-projects').then(response => {
                this.projects = response.data.data;
            }).catch(error => {
                console.error('Error fetching projects:', error);
            });

            window.axios.get('admin/p5-themes').then(response => {
                this.themes = response.data.data;
            }).catch(error => {
                console.error('Error fetching themes:', error);
            });
        },
        deleteProjectConfirmation(project) {
            Swal.fire({
                title: "Yakin ingin menghapus projek?",
                text: "Projek yang dihapus tidak dapat dipulihkan",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Iya, Hapus Data!"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteProject(project);
                }
            });
        },
        deleteProject(project) {
            console.log("🚀 ~ deleteProject ~ project:", project)
            window.axios.delete(`admin/p5-projects/${project.id}`).then(response => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Proyek berhasil dihapus",
                    icon: "success"
                });
                this.load();
            }).catch(error => {
                console.error('Error adding projects:', error);
            })

        },
        closeModal() {
            $('.modal').modal('hide');
            this.selectedProject = [];
        },
        selectProject(project) {
            console.log("🚀 ~ selectProject ~ project:", project)
            this.selectedProject = project
        },
        addProject() {
            window.axios.post('admin/p5-projects', {
                code: this.selectedProject.code,
                name: this.selectedProject.name,
                phase: this.selectedProject.phase,
                description: this.selectedProject.description,
                p5_theme_id: this.selectedProject.p5_theme_id
            }).then(response => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Proyek berhasil dibuat",
                    icon: "success"
                });
                this.closeModal();
                this.load();
            }).catch(error => {
                console.error('Error adding projects:', error);
            })
        },
        editProject() {
            // hapus dlu agar tidak ikut request->all()
            delete this.selectedProject.phases
            delete this.selectedProject.theme

            window.axios.put(`admin/p5-projects/${this.selectedProject.id}`, {
                code: this.selectedProject.code,
                name: this.selectedProject.name,
                phase: this.selectedProject.phase,
                description: this.selectedProject.description,
                p5_theme_id: this.selectedProject.p5_theme_id
            }).then(response => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Proyek berhasil diedit",
                    icon: "success"
                });
                this.closeModal();
                this.load();
            }).catch(error => {
                console.error('Error editing projects:', error);
            })
        },
        setModalStatus(status) {
            this.modalStatus = status;
        },
        saveProject() {
            if (this.modalStatus == 'Tambah') {
                this.addProject();
                return
            }

            this.editProject();
        },
        deletePhase(phase) {
            window.axios.delete(`admin/p5-projects/${this.selectedProject.id}/phase/${phase.id}`).then(response => {
                Swal.fire({
                    title: "Berhasil!",
                    text: response.data.message,
                    icon: "success"
                });
                this.load();
                this.projects.map((project, index) => {
                    if (project.id == this.selectedProject.id) {
                        this.selectedProject = project;
                    }
                })
            }).catch(error => {
                console.error('Error deleting phases:', error);
            })
        },
        getSubelements() {
            window.axios.get('admin/p5-subelements', {
                phase: 'E',
            }).then(response => {
                this.subelements = response.data.data;
            }).catch(error => {
                console.error('Error fetching subelements:', error);
            });
        },
        addPhaseFromSubElement(subelement) {
            window.axios.post(`admin/p5-projects/${this.selectedProject.id}/subelement/${subelement.id}`).then(response => {
                Swal.fire({
                    title: "Berhasil!",
                    text: response.data.message,
                    icon: "success"
                });
                this.closeModal();
                this.load();
            }).catch(error => {
                console.error('Error adding phases:', error);
            });
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
                            <div class="d-flex justify-content-between">
                                <h5>
                                    Data Proyek P5
                                </h5>
                                <button class="w-fit btn btn-sm btn-success" type="button" data-bs-toggle="modal"
                                    data-bs-target="#ProjectForm" @click="setModalStatus('Tambah')">
                                    <i class="ti ti-plus me-0 me-sm-1 ti-xs"></i>
                                    <span class="d-none d-sm-inline-block">Tambah Proyek</span>
                                </button>
                            </div>
                            <div class="table-responsive ">
                                <table class="table">
                                    <thead>
                                        <tr class="text-nowrap">
                                            <th scope="col">No.</th>
                                            <th scope="col" style="min-width: 200px;">Nama Proyek</th>
                                            <th scope="col">Deskripsi Proyek</th>
                                            <th scope="col">Capaian Profil</th>
                                            <th scope="col">Opsi</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-border-bottom-0">
                                        <tr v-if="projects?.length > 0" v-for="project in projects" :key="project.id">
                                            <th scope="row">{{ project.id }}</th>
                                            <td>{{ project.name }}</td>
                                            <td>{{ project.description }}</td>
                                            <td>
                                                <button class="btn btn-sm btn-primary w-100" type="button"
                                                    data-bs-toggle="modal" data-bs-target="#ProjectAchievementTarget"
                                                    @click="selectProject(project)">
                                                    <i class="ti ti-eye me-0 me-sm-1 ti-xs"></i>
                                                    <span class="d-none d-sm-inline-block">Cek</span>
                                                </button>
                                            </td>
                                            <td>
                                                <button class="btn btn-sm btn-warning m-1" type="button"
                                                    data-bs-toggle="modal" data-bs-target="#ProjectForm"
                                                    @click="setModalStatus('Edit'); selectProject(project)">
                                                    <i class="ti ti-pencil me-1 ti-xs"></i>
                                                    <span class="d-pencil d-sm-inline-block">Ubah</span>
                                                </button>
                                                <button class="btn btn-sm btn-danger m-1" type="button"
                                                    @click="deleteProjectConfirmation(project)">
                                                    <span><i class="ti ti-trash me-1 ti-xs"></i><span
                                                            class="d-trash d-sm-inline-block">Hapus</span></span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr v-else>
                                            <td colspan="5" class="text-center">Maaf, Belum ada Data</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Content -->
                    <!-- add projet -->
                    <div class="modal fade" id="ProjectForm" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Form {{ modalStatus }} Proyek</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                        @click="closeModal()"></button>
                                </div>
                                <div class="modal-body">
                                    <!-- project number -->
                                    <div class="mb-2">
                                        <span><label class="form-label" for="project_number">No. Proyek</label></span>
                                        <input type="text" class="form-control" id="project_number"
                                            v-model="selectedProject.code">
                                    </div>

                                    <!-- project name -->
                                    <div class="mb-2">
                                        <span><label class="form-label" for="project_name">Nama Proyek</label></span>
                                        <input type="text" class="form-control" id="project_name"
                                            v-model="selectedProject.name">
                                    </div>

                                    <hr>
                                    <!-- theme project -->
                                    <div class="mb-2">
                                        <span><label class="form-label" for="theme_project">Pilih Tema
                                                Proyek</label></span>
                                        <select class="form-control" name="" id="theme_project"
                                            v-model="selectedProject.p5_theme_id">
                                            <option v-for="theme in themes" :value="theme.id">{{ theme.name }}</option>
                                        </select>
                                    </div>

                                    <!-- phase project -->
                                    <div class="mb-2">
                                        <span><label class="form-label" for="phase_project">Pilih Fase
                                                Proyek</label></span>
                                        <select v-model="selectedProject.phase" class="form-control" name=""
                                            id="phase_project">
                                            <option>E</option>
                                        </select>
                                    </div>
                                    <hr>

                                    <!-- Description -->
                                    <div class="mb-2">
                                        <span><label class="form-label" for="project_desc">Deskripsi
                                                Proyek</label></span>
                                        <textarea name="" class="form-control" id="project_desc" rows="6"
                                            v-model="selectedProject.description"></textarea>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-primary col-md-12" id="#submit-add_project"
                                        @click="saveProject()">Simpan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- profile achivement -->
                    <div class="modal fade" id="ProjectAchievementTarget" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Proyek : {{ selectedProject.name }}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <button class="float-end w-fit btn btn-sm btn-success" type="button"
                                        data-bs-toggle="modal" data-bs-target="#ProjectAchievementTargetAdd"
                                        @click="getSubelements()">
                                        <i class="ti ti-plus me-0 me-sm-1 ti-xs"></i>
                                        <span class="d-none d-sm-inline-block">Tambah Pencapaian</span>
                                    </button>

                                    <table class="table border-hover">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Dimensi</th>
                                                <th>Elemen</th>
                                                <th>Sub Elemen</th>
                                                <th>Capaian Akhir Fase</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-if="selectedProject.phases?.length > 0"
                                                v-for="phase in selectedProject.phases" :key="phase.id">
                                                <td>{{ phase.id }}</td>
                                                <td>{{ phase.sub_element.element.dimension.name }}</td>
                                                <td>{{ phase.sub_element.element.name }}</td>
                                                <td>{{ phase.sub_element.name }}</td>
                                                <td>{{ phase.description }}</td>
                                                <td>
                                                    <button class="btn btn-sm btn-danger m-1" type="button"
                                                        @click="deletePhase(phase)">
                                                        <i class="ti ti-trash me-1 ti-xs"></i>
                                                        <span class="d-trash d-sm-inline-block">Hapus</span>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <td colspan="6" class="text-center">Maaf, Belum ada Data</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Modal Content -->
                    <!-- profile achivement Add -->
                    <div class="modal fade" id="ProjectAchievementTargetAdd" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Proyek : {{ selectedProject.name }}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <table class="table border-hover">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Dimensi</th>
                                                <th>Elemen</th>
                                                <th>Sub Elemen</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-if="subelements?.length > 0" v-for="subelement in subelements"
                                                :key="subelement.id">
                                                <td>{{ subelement.id }}</td>
                                                <td>{{ subelement.element.dimension.name }}</td>
                                                <td>{{ subelement.element.name }}</td>
                                                <td>{{ subelement.name }}</td>
                                                <td>
                                                    <button class="btn btn-sm btn-success m-1" type="button"
                                                        @click="addPhaseFromSubElement(subelement)">
                                                        <i class="ti ti-plus me-1 ti-xs"></i>
                                                        <span class="d-plus d-sm-inline-block">Tambah</span>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <td colspan="6" class="text-center">Maaf, Belum ada Data</td>
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