<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { showAlert } from '../composables/swal';

import "@/assets/js/pages-auth";
import Swal from 'sweetalert2';

let isAuthenticated = null;
// get auth user
axios.get('user').then(response => {
  isAuthenticated = true;
}).catch(error => {
  isAuthenticated = false;
});

if (isAuthenticated) {
  router.push({
    path: route.query.redirect ?? 'dashboard'
  })
}

const route = useRoute();
const form = reactive({
  email: '',
  password: ''
});

let redirect = '';

// keluar alert jika hasil redirect
if (route.query.redirect != null) {
  redirect = route.query.redirect;

  showAlert(['error', 'Maaf...', 'Sesi Login Anda Habis, Silahkan Login Terlebih Dahulu.'], {
    willClose: function () {
      router.replace({ query: null });
    }
  });
}

// fungsi ketika submit form login
async function submit() {
  await axios.get('sanctum/csrf-cookie', {
    baseURL: "http://localhost:8000/"
  })
  await axios.post('login', form)
    .then(response => {
      const token = response.data.data.token;
      console.log("🚀 ~ submit ~ token:", token)
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      router.push({ name: 'dashboard' });
    })
    .catch(error => {
      const response = error.response

      if (response.status == 422) {
        let errListHtml = `<ul style="list-style-type: none; margin: 0; padding: 0">`

        for (const [key, value] of Object.entries(response.data.errors)) {
          console.log("🚀 ~ submit ~ value:", value)

          errListHtml += `<li>${value}</li>`
        }

        errListHtml += `</ul>`

        Swal.fire({
          icon: "error",
          title: "Maaf...",
          html: errListHtml,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Maaf...",
          text: response.data.message,
        });
      }
    })
    .finally(() => form.password = '');
}

document.documentElement.classList = "light-style layout-wide customizer-hide"; // rubah class html
</script>

<!-- Page CSS -->
<!-- Page -->
<link rel="stylesheet" href="../../assets/vendor/css/pages/page-auth.css" />

<template>
  <div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
      <div class="authentication-inner py-4">
        <!-- Login -->
        <div class="card">
          <div class="card-body">
            <h4 class="mb-1 pt-2">Selamat Datang! 👋</h4>
            <p class="mb-4">Harap Masukkan Email dan Password untuk mengungjungi laman Dashboard</p>

            <form id="formAuthentication" @submit.prevent="submit()">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" id="email" name="email" v-model="form.email"
                  placeholder="Enter your email" autofocus />
              </div>
              <div class="mb-3 form-password-toggle">
                <div class="d-flex justify-content-between">
                  <label class="form-label" for="password">Password</label>
                </div>
                <div class="input-group input-group-merge">
                  <input type="password" id="password" class="form-control" name="password" v-model="form.password"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    aria-describedby="password" />
                  <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off"></i></span>
                </div>
              </div>
              <button class="btn btn-primary d-grid w-100" type="submit">Masuk</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>