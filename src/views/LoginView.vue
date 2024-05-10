<style scoped>
  @import "@/assets/vendor/css/pages/page-auth.css";
</style>

<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();
const form = reactive({
  email: '',
  password: ''
});

let redirect = '';

// fungsi ketika submit form login

async function submit(email, password) {
  try {
    const email = this.form.email;
    const password = this.form.password;
    const response = await axios.post('/login', {
      email: email,
      password: password
    });
    localStorage.setItem('token', response.data.data.token)
    localStorage.setItem('user', response.data.data.user)
    router.push({ path: 'dashboard' });
  } catch (error) {
    alert('Verification Failed')
  }
}

document.documentElement.classList = "light-style layout-wide customizer-hide"; // rubah class html
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
