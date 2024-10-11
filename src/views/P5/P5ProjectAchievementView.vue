<style scoped>
@import "../../assets/vendor/css/pages/cards-advance.css";
</style>

<script setup>
import Navbar from '../../components/Navbar.vue'
import Sidebar from '../../components/Sidebar.vue'
import Footer from '../../components/Footer.vue'
import Swal from 'sweetalert2';

import '../../assets/js/dashboards-analytics.js'
</script>

<script>
export default {
  data() {
    return {
      filter: {
        dimension: {},
        element: {},
        subelement: {},
        group: {},
      },
      form: [],
      groups: [],
      selected_predicate: null,
      elements: [],
      subelements: [],
      dimensions: [],
      students: [],
      predicate_options: [],
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.getPredicateOptions();
      this.getP5Groups();
      document.documentElement.classList = "light-style layout-navbar-fixed layout-menu-fixed layout-compact"; // rubah class html
    },
    getPredicateOptions() {
      window.axios.get('predicate-options').then(response => {
        this.predicate_options = response.data.data;
      }).catch(error => {
        console.error('Error fetching predicate options:', error);
      });
    },
    getP5Groups() {
      window.axios.get('guru/p5/groups').then(response => {
        this.groups = response.data.data;
        console.log("🚀 ~ window.axios.get ~ this.groups:", this.groups)
      }).catch(error => {
        console.error('Error fetching groups:', error);
      });
    },
    fetchP5GroupDimensions(event) {
      // const group = event.target.value
      const group = this.filter.group;
      this.dimensions = group.dimensions
    },
    // fetchP5GroupElements(event) {
    //   const dimension = event.target.value
    //   this.elements = dimension.elements
    //   console.log("🚀 ~ fetchP5GroupElements ~ this.elements:", this.elements)
    // },
    // fetchP5GroupSubelements(event) {
    //   const element = event.target.value
    //   this.subelements = element.subs
    //   console.log("🚀 ~ fetchP5GroupSubelements ~ this.subelements:", this.subelements)
    // },
    fetchStudentForms() {
      this.students = this.filter.group.students;

      this.students.forEach((student, index) => {
        this.form.push({
          'student_id': student.id,
          'predicate_id': null,
          'note': null
        })
      });
    },
    inputPredicate(index, student, event) {
      const predicate = this.predicate_options.find(predicate => predicate.id == this.form[index].predicate_id);
      let note = predicate.desc

      let note_arr = note.split(":")

      note_arr[1] = student.name
      note = note_arr.join("")

      this.form[index].predicate_id = predicate.id
      this.form[index].note = note
      // this.form[index].predicate_id = this.selected_predicate.id
    },
    submit() {
      window.axios.post('guru/p5/grades', {
        form: this.form
      }).then(response => {
        console.log("🚀 ~ window.axios.post ~ response:", response)
      }).catch(error => {
        console.error('Error Submiting Data:', error);
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
              <h5>Input Nilai Proyek P5</h5>
              <div class="row mb-3">
                <label class="form-label">Pilih Kelompok</label>
                <select v-model="filter.group" class="form-select" @change="fetchP5GroupDimensions">
                  <option v-for="group in groups" :key="group.id" :value="group">{{ group.name }}</option>
                </select>
              </div>
              <div class="row mb-3">
                <label class="form-label">Pilih Dimensi</label>
                <select v-model="filter.dimension" class="form-select" @change="fetchStudentForms">
                  <option v-for="dimension in dimensions" :key="dimension.id" :value="dimension">{{ dimension.name }}
                  </option>
                </select>
              </div>
              <!-- <div class="row mb-3">
                <label class="form-label">Pilih Elemen</label>
                <select v-model="form.element" class="form-select" @change="fetchP5GroupSubelements">
                  <option v-for="element in elements" :key="element.id" :value="element">{{ element.name }}</option>
                </select>
              </div>
              <div class="row mb-3">
                <label class="form-label">Pilih Elemen</label>
                <select v-model="form.element" class="form-select" @change="fetchP5GroupSubelements">
                  <option v-for="element in elements" :key="element.id" :value="element">{{ element.name }}</option>
                </select>
              </div> -->
              <!-- <div class="row">
                <div class="col-12">
                  <label class="form-label">Pilih Dimensi Profil</label>
                  <select v-model="form.dimension_id" class="form-select" aria-label="Default select example">
                    <option v-for="dimension in dimensions" :value="dimension.id">{{ dimension.name }}</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label" for="project_number">Pilih Fase</label>
                  <select v-model="form.phase" class="form-select" aria-label="Default select example">
                    <option>E</option>
                  </select>
                </div>
              </div> -->

              <button class="btn btn-info w-100 mt-4 mx-auto" @click="getPhases()">
                <i class="ti ti-search"></i>
                Cari
              </button>

              <div class="table-responsive text-nowrap">
                <table class="table border-hover">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Nama Siswa</th>
                      <th>NIS</th>
                      <th>Predikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="students?.length > 0" v-for="(student, i) in students" :key="i">
                      <td>{{ i }}</td>
                      <td>{{ student.name }}</td>
                      <td>{{ student.nis }}</td>
                      <td>
                        <!-- <input type="hidden" v-model="form[i].student_id"> -->
                        <select class="form-select" v-model="form[i].predicate_id"
                          @change="inputPredicate(i, student, $event)">
                          <option v-for="predicate in predicate_options" :key="predicate.id" :value="predicate.id">{{
                            predicate.name }}</option>
                        </select>
                      </td>
                    </tr>
                    <tr v-else>
                      <td colspan="6" class="text-center">Maaf, Belum ada Data</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button class="btn btn-primary w-50 mt-4 mx-auto" @click="submit()">
                Simpan
              </button>
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
