<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { showAlert } from '../composables/swal';

import "../assets/js/pages-auth.js";

console.log('test');

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
function submit() {
  message.value = '';
  axios.post('login', form)
    .then(response => {
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      router.push({ name: 'user' });
    })
    .catch(error => {
      if (error.response.status === 422) {
        message.value = error.response.data.message;
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
  <!-- <div>
    <form @submit.prevent="submit" class="login">
      <div class="form-group">
        <label>Email</label>
        <input v-model="form.email" type="text" class="form-input">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="form.password" type="password" class="form-input">
      </div>
      <div class="form-group">
        <button type="submit" class="form-input">Login</button>
      </div>
    </form>
  </div> -->
  <div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
      <div class="authentication-inner py-4">
        <!-- Login -->
        <div class="card">
          <div class="card-body">
            <!-- Logo -->
            <!-- <div class="app-brand justify-content-center mb-4 mt-2">
              <a href="index.html" class="app-brand-link gap-2">
                <span class="app-brand-text demo text-body fw-bold ms-1">Vuexy</span>
              </a>
            </div> -->
            <!-- /Logo -->
            <h4 class="mb-1 pt-2">Selamat Datang! 👋</h4>
            <p class="mb-4">Harap Masukkan Email dan Password untuk mengungjungi laman Dashboard</p>

            <form id="formAuthentication" class="mb-3" action="index.html" method="GET">
              <div class="mb-3">
                <label for="email" class="form-label">Email or Username</label>
                <input type="text" class="form-control" id="email" name="email-username"
                  placeholder="Enter your email or username" autofocus />
              </div>
              <div class="mb-3 form-password-toggle">
                <div class="d-flex justify-content-between">
                  <label class="form-label" for="password">Password</label>
                  <a href="auth-forgot-password-basic.html">
                    <small>Forgot Password?</small>
                  </a>
                </div>
                <div class="input-group input-group-merge">
                  <input type="password" id="password" class="form-control" name="password"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    aria-describedby="password" />
                  <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off"></i></span>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="remember-me" />
                  <label class="form-check-label" for="remember-me"> Remember Me </label>
                </div>
              </div>
              <div class="mb-3">
                <button class="btn btn-primary d-grid w-100" type="submit">Sign in</button>
              </div>
            </form>

            <p class="text-center">
              <span>New on our platform?</span>
              <a href="auth-register-basic.html">
                <span>Create an account</span>
              </a>
            </p>

            <div class="divider my-4">
              <div class="divider-text">or</div>
            </div>

            <div class="d-flex justify-content-center">
              <a href="javascript:;" class="btn btn-icon btn-label-facebook me-3">
                <i class="tf-icons fa-brands fa-facebook-f fs-5"></i>
              </a>

              <a href="javascript:;" class="btn btn-icon btn-label-google-plus me-3">
                <i class="tf-icons fa-brands fa-google fs-5"></i>
              </a>

              <a href="javascript:;" class="btn btn-icon btn-label-twitter">
                <i class="tf-icons fa-brands fa-twitter fs-5"></i>
              </a>
            </div>
          </div>
        </div>
        <!-- /Register -->
      </div>
    </div>
  </div>
</template>