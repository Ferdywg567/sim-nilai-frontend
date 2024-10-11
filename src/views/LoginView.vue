<style scoped>
@import "@/assets/vendor/css/pages/page-auth.css";
</style>

<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import Swal from 'sweetalert2';
const route = useRoute();
// const form = reactive({
//   email: '',
//   password: ''
// });

if (route.params.loggedOut) {
  Swal.fire({
    title: "Berhasil!",
    text: "Anda Telah Logout Dari Sistem.",
    icon: "success"
  });
}
// fungsi ketika submit form login

const togglePass = function () {
  const pass_input = document.querySelector('#password');

  if (pass_input.attributes["type"].value == 'password') {
    pass_input.attributes["type"].value = 'text';
  } else {
    pass_input.attributes["type"].value = 'password';
  }
}

document.documentElement.classList = "light-style layout-wide customizer-hide"; // rubah class html
</script>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    submit() {

      const email = this.form.email;
      const password = this.form.password;

      window.axios.post('/login', {
        email: email,
        password: password
      }).then(response => {
        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.data.user))
        window.axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
        router.push({ path: 'dashboard' });
      }).catch(error => {
        console.error('Error Authentiacting Account:', error);
      });
    }
  }
}
</script>

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
                  <span class="input-group-text cursor-pointer" @click="togglePass"><i class="ti ti-eye-off"></i></span>
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
