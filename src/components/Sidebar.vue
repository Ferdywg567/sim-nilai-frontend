<script>
export default {
    data() {
        return {
            user: [],
            hasP5Group: false,
            isAdmin: false
        }
    },
    mounted() {
        this.load();
    },
    methods: {
        load() {
            this.user = JSON.parse(localStorage.getItem('user'))
            this.isAdmin = this.user.role_id == 1;

            if (!this.isAdmin) {
                window.axios.get('guru/p5/groups').then(response => {
                    this.hasP5Group = response.data.data.length > 0;
                });
            }
        }
    }
}
</script>

<template>
    <!-- Menu -->
    <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
        <div class="app-brand demo">
            <RouterLink to="/dashboard" class="app-brand-link">
                <!-- <span class="app-brand-logo demo">
                    <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                            fill="#7367F0" />
                        <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd"
                            d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z" fill="#161616" />
                        <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd"
                            d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z" fill="#161616" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                            fill="#7367F0" />
                    </svg>
                </span> -->
                <span class="app-brand-text demo menu-text fw-bold">SiAkad - Nilai</span>
            </RouterLink>

            <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto">
                <i class="ti menu-toggle-icon d-none d-xl-block ti-sm align-middle"></i>
                <i class="ti ti-x d-block d-xl-none ti-sm align-middle"></i>
            </a>
        </div>

        <div class="menu-inner-shadow"></div>
        <ul class="menu-inner py-1">
            <!-- Dashboards -->
            <li class="menu-item active">
                <RouterLink to="/dashboard" class="menu-link">
                    <i class="menu-icon tf-icons ti ti-smart-home"></i>
                    Dashboard
                </RouterLink>
            </li>
            <li class="menu-header small text-uppercase" v-if="isAdmin">
                <span class="menu-header-text">Guru & Siswa</span>
            </li>
            <li class="menu-item" v-if="isAdmin">
                <RouterLink to="/guru" class="menu-link">
                    Data Guru
                </RouterLink>
            </li>
            <li class="menu-item" v-if="isAdmin">
                <RouterLink to="/siswa" class="menu-link">
                    Data Siswa
                </RouterLink>
            </li>
            <li class="menu-item" v-if="isAdmin">
                <RouterLink to="/kelas" class="menu-link">
                    Data Kelas
                </RouterLink>
            </li>
            <li class="menu-header small text-uppercase" v-if="isAdmin">
                <span class="menu-header-text" v-if="isAdmin">P5</span>
            </li>
            <li class="menu-item" v-if="isAdmin">
                <RouterLink to="/tema-p5" class="menu-link">
                    Tema P5
                </RouterLink>
            </li>
            <li class="menu-item" v-if="isAdmin">
                <a href="/target-proyek-p5" class="menu-link">
                    Target Capaian Profil P5
                </a>
            </li>
            <li class="menu-item" v-if="isAdmin">
                <RouterLink to="/proyek-p5" class="menu-link">
                    Proyek P5
                </RouterLink>
            </li>
            <li class="menu-item" v-if="isAdmin">
                <a href="/kelompok-p5" class="menu-link">
                    Kelompok P5
                </a>
            </li>

            <!--* ============= GURU SECTION =============-->
            <li class="menu-header small text-uppercase" v-if="!isAdmin">
                <span class="menu-header-text">Mata Pelajaran</span>
            </li>
            <li class="menu-item" v-if="!isAdmin">
                <RouterLink to="/capaian-proyek" class="menu-link">
                    Input Capaian Proyek
                </RouterLink>
            </li>
            <li class="menu-item" v-if="!isAdmin">
                <RouterLink to="/catatan-proses-proyek" class="menu-link">
                    Catatan Proses Proyek
                </RouterLink>
            </li>
            <li class="menu-item" v-if="!isAdmin">
                <a href="/download-capaian-p5" class="menu-link">
                    Download Capaian P5
                </a>
            </li>
        </ul>
    </aside>
    <!-- / Menu -->
</template>