import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import P5ThemeView from '@/views/P5ThemeView.vue'
import P5ProjectView from '@/views/p5/ProjectView.vue'
import P5GroupView from '@/views/P5GroupView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => {
      router.push({ name: 'login' })
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
    path: '/project-p5',
    name: 'projectP5',
    component: P5ProjectView,
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
      // localStorage.removeItem('token');
      // axios.defaults.headers.common['Authorization'] = 'Bearer';

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
