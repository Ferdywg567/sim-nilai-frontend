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
            <div class="admin-section" v-if="authUser?.isAdmin">
              <div class="card card-body mb-4">
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
            <div class="guru-section" v-else>
              <div class="card card-body mb-4">
                <h5>List Kelas yang Diampu</h5>
                <div class="table-responsive text-nowrap">
                  <table class="table">
                    <thead>
                      <tr class="text-nowrap">
                        <th class="text-center">No.</th>
                        <th>Rombongan Belajar</th>
                        <th>Mata Pelajaran</th>
                        <th class="text-center">Jumlah Siswa</th>
                      </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                      <tr v-if="teachings.length > 0" v-for="teaching in teachings" :key="teaching.id">
                        <td>{{ teaching.study_class_id }}</td>
                        <td>{{ teaching.study_class.name }}</td>
                        <td>{{ teaching.subject.name }}</td>
                        <td class="text-center">{{ teaching.studentsCount }}</td>
                      </tr>
                      <tr v-else>
                        <td colspan="7" class="text-center">Maaf, belum ada Data.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card card-body mb-4" v-if="authUser?.hasP5Group">
                <h5>List Kelompok P5 yang Diampu</h5>
                <div class="table-responsive text-nowrap">
                  <table class="table">
                    <thead>
                      <tr class="text-nowrap">
                        <th class="text-center">No.</th>
                        <th>Rombongan Belajar</th>
                        <th>Mata Pelajaran</th>
                        <th class="text-center">Jumlah Siswa</th>
                      </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                      <tr v-if="p5Groups.length > 0" v-for="group in p5Groups" :key="group.id">
                        <td>{{ group.study_class_id }}</td>
                        <td>{{ group.study_class.name }}</td>
                        <td>{{ group.subject.name }}</td>
                        <td class="text-center">{{ group.studentsCount }}</td>
                      </tr>
                      <tr v-else>
                        <td colspan="7" class="text-center">Maaf, belum ada Data.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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

<script setup>
import '../assets/js/dashboards-analytics.js'

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import Navbar from './../components/Navbar.vue'
import Sidebar from './../components/Sidebar.vue'
import Footer from './../components/Footer.vue'

const router = useRouter();

const authUser = ref(null);
const gurus = ref([]);
const teachings = ref([]);
const p5Groups = ref([]);
const selectedClass = ref([]);

const initializeAuthUser = () => {
  let rawUser = localStorage.getItem('user');
  authUser.value = rawUser ? JSON.parse(rawUser) : null;

  if (authUser.value) {
    authUser.value.isAdmin = authUser.value.role_id == 1;
    console.log("🚀 ~ authUser.value:", authUser.value);
  } else {
    // Jika user tidak ada, redirect ke halaman login
    router.push({
      name: 'login',
      params: {
        notLoggedIn: true
      },
      query: {
        redirect: router.currentRoute.value.path
      }
    });
  }
};

const initAdmin = () => {
  window.axios.get('admin/gurus').then(response => {
    gurus.value = response.data.data;
  }).catch(error => {
    console.error('Error fetching gurus:', error);
  });
};

const initGuru = () => {
  window.axios.get('guru/study-classes').then(response => {
    teachings.value = response.data.data;

    for (const teaching of teachings.value) {
      teaching.studentsCount = teaching.study_class.students.length;
    }
    console.log("🚀 ~ window.axios.get ~ teachings:", teachings);
  }).catch(error => {
    console.error('Error fetching teachings:', error);
  });

  window.axios.get('guru/p5/groups').then(response => {
    authUser.value.hasP5Group = false;

    if (response.data.data.length) {
      authUser.value.hasP5Group = true;
      console.log("🚀 ~ window.axios.get ~ authUser:", authUser.value);
      p5Groups.value = response.data.data;
    }
  }).catch(error => {
    console.error('Error fetching p5 groups:', error);
  });
};

const selectClass = (studyClass) => {
  selectedClass.value = studyClass;
  console.log("🚀 ~ selectClass ~ selectedClass:", selectedClass);
};

// Lifecycle hook mounted
onMounted(() => {
  initializeAuthUser();
  if (authUser.value?.isAdmin) {
    initAdmin();
  } else {
    initGuru();
  }
});
</script>
