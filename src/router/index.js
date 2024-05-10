import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import P5ThemeView from '@/views/P5/P5ThemeView.vue'
import P5ProjectView from '@/views/P5/P5ProjectView.vue'
import P5GroupView from '@/views/P5/P5GroupView.vue'
import P5AchievementTarget from '@/views/P5/P5AchievementTarget.vue'
import GuruView from '@/views/GuruView.vue'
import StudentView from '@/views/StudentView.vue'
import StudyClassView from '@/views/StudyClassView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => {
      router.push({ name: 'login' })
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      auth: true,
      role: 'admin'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },


  // ==========
  // === P5 ===
  // ==========
  {
    path: '/proyek-p5',
    name: 'proyekP5',
    component: P5ProjectView,
    meta: {
      auth: true,
      role: 'admin'
    }
  },
  {
    path: '/tema-p5',
    name: 'temaP5',
    component: P5ThemeView,
    meta: {
      auth: true,
      role: 'admin'
    }
  },
  {
    path: '/kelompok-p5',
    name: 'kelompokP5',
    component: P5GroupView,
    meta: {
      auth: true,
      role: 'admin'
    }
  },
  {
    path: '/target-proyek-p5',
    name: 'targetProyekP5',
    component: P5AchievementTarget,
    meta: {
      auth: true,
      role: 'admin'
    }
  },
  {
    path: '/guru',
    name: 'guru',
    component: GuruView,
    meta: {
      auth: true,
      role: 'admin'
    }
  },
  {
    path: '/siswa',
    name: 'siswa',
    component: StudentView,
    meta: {
      auth: true,
      role: 'admin'
    }
  },
  {
    path: '/kelas',
    name: 'kelas',
    component: StudyClassView,
    meta: {
      auth: true,
      role: 'admin'
    }
  },
  // {
  //   path: '/user',
  //   name: 'user',
  //   component: UserView
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

// login guard
router.beforeEach(async (to, from, next) => {
  // guard route if needs "auth"
  if (to.matched.some(record => record.meta.auth)) {
    // Redirect the user to the login page if not authenticated:
    if (localStorage.getItem('token') == null) {

      localStorage.removeItem('token');
      axios.defaults.headers.common['Authorization'] = 'Bearer';

      next({
        name: 'login',
        params: {
          notLoggedIn: true
        },
        query: {
          redirect: router.currentRoute.value.name
        }
      })
    } else next()
  } else {
    next()
  }

})

export default router
